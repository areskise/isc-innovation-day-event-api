const ideaModel = require('./idea.model');
const ideaTypeModel = require('../ideaType/ideaType.model');
const voteModel = require('../vote/vote.model');
const { rsErrorNotFound, rsSuccess, rsErrorOperation, rsError, rsErrorUnauthorized } = require("../helpers/response");
const userModel = require('../user/user.model');

const getListIdea = async (req, res) => {
  try {
    const decode = req.jwtDecode
    var userFound

    let query = {
      event: req.query.event,
    };
    if (req.query.type) {
      query.type = req.query.type;
    }

    if (req.query.status) {
      query.status = req.query.status;
    }
    
    if (req.query.department) {
      query.department = req.query.department;
    }

    if (req.query.sort) {
      query.sort = req.query.sort;
    }
    const resData = await ideaModel.getList(query, req.query.page, req.query.item_per_page);
    const result = [];

    if (decode) {
      userFound = await userModel.findUserByEmail(decode.email)
    }

    if (userFound) {
      for await (const idea of resData.docs) {
        const count = await voteModel.countVote(idea._id);
        const checkVoted = await voteModel.findVote(userFound._id, idea._id)
        result.push({
          ...idea.toObject(),
          vote: count,
          is_voted: checkVoted ? true : false
        })
      }
    } else {
      for await (const idea of resData.docs) {
        const count = await voteModel.countVote(idea._id);
        result.push({
          ...idea.toObject(),
          vote: count
        })
      }

    }


    return res.json(rsSuccess({
      docs: result,
      total: resData.total,
      limit: resData.limit,
      page: resData.page,
      pages: resData.pages

    }))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

//vietcn 07/02/2023 get list idea by me
const getListIdeaByMe = async (req, res) => {
  try {
    const decode = req.jwtDecode
    var userFound

    let query = {
      event: req.query.event,
    };
    if (req.query.type) {
      query.type = req.query.type;
    }

    if (req.query.sort) {
      query.sort = req.query.sort;
    }
    if (decode) {
      userFound = await userModel.findUserByEmail(decode.email)
      query.author = userFound._id
    }

    const resData = await ideaModel.getList(query, req.query.page, req.query.item_per_page);
    const result = [];

    if (userFound) {
      for await (const idea of resData.docs) {
        const count = await voteModel.countVote(idea._id);
        const checkVoted = await voteModel.findVote(userFound._id, idea._id)
        result.push({
          ...idea.toObject(),
          vote: count,
          is_voted: checkVoted ? true : false
        })
      }
    } else {
      for await (const idea of resData.docs) {
        const count = await voteModel.countVote(idea._id);
        result.push({
          ...idea.toObject(),
          vote: count
        })
      }
    }

    return res.json(rsSuccess({
      docs: result,
      total: resData.total,
      limit: resData.limit,
      page: resData.page,
      pages: resData.pages
    }))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

const addIdea = async (req, res) => {
  try {
    console.log(req.body)
    const type = await ideaTypeModel.getTypeByTitle(req.body.type);
    if (!type) {
      return res.json(rsErrorNotFound('Idea Type'));
    }
    const user = req.jwtDecode;
    const idea = await ideaModel.addIdea({
      avatar: req.body.avatar,
      name: req.body.name,
      short_desc: req.body.short_desc,
      type: type.title,
      file: req.body.file,
      event: req.body.event,
      author: user._id,
      department: user.department,
      create_by: user.email,
    });
    return res.json(rsSuccess({_id: idea._id}))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

const updateIdea = async (req, res) => {
  try {
    const type = await ideaTypeModel.getTypeByTitle(req.body.type);
    if (!type) {
      return res.json(rsErrorNotFound('Idea Type'));
    }
    const user = req.jwtDecode;

    const idea = await ideaModel.getIdeaById(req.body.id)
    if(user._id+"" != idea.author._id+""){
      return res.json(rsErrorUnauthorized())
    }
    await ideaModel.updateIdea(req.body.id, {
      avatar: req.body.avatar,
      name: req.body.name,
      short_desc: req.body.short_desc,
      type: type.title,
      file: req.body.file,
      author: user._id,
      department: user.department,
      update_by: user.email,
    });
    return res.json(rsSuccess(null))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

const getIdea = async (req, res) => {
  try {
    const idea = await ideaModel.getIdeaById(req.params.id);
    if (!idea) {
      return res.json(rsErrorNotFound('Idea'));
    }
    const type = await ideaTypeModel.getTypeByTitle(idea.type);
    const user = req.jwtDecode;
    let resData = {};
    if (user) {
      const find = await voteModel.findVote(user._id, idea._id);
      if (find) {
        resData = {
          ...idea.toObject(),
          voted: true
        }
      } else {
        resData = {
          ...idea.toObject(),
          voted: false
        }
      }
      
    } else {
      resData = idea.toObject();
    }
    if(type){
      resData.type_name = type.name
    }
    return res.json(rsSuccess(resData))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

module.exports = {
  getListIdea,
  addIdea,
  updateIdea,
  getIdea,
  getListIdeaByMe
}
