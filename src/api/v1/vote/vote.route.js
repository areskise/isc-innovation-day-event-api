const express = require('express');
const router = express.Router();

const voteController = require('./vote.controller');
const validate = require('../middlewares/validate.middleware');
const { addVoteSchema, deleteVoteSchema } = require('./vote.validation');
const { isAuth, isAuthOption } = require('../middlewares/auth.middleware');
const { speedLimiter1p1} = require('../middlewares/slow.middleware');

router.route('/')
  .post(isAuth, speedLimiter1p1 ,validate(addVoteSchema), voteController.addVote)
  .delete(isAuth, validate(deleteVoteSchema), voteController.deleteVote)
  .get(isAuthOption, voteController.getCountVote);

router.route('/list')
  .get(voteController.getListVote);

module.exports = router;