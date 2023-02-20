const Cryptr = require("cryptr");
const userModel = require('./user.model');
const ideaModel = require('../idea/idea.model');
const otpModel = require('./otp.model');
const { rsErrorNotFound, rsSuccess, rsErrorOperation, rsError } = require("../helpers/response");
const jwt = require("../helpers/jwt");
const config = require("../../../config");
const thirdPartyApi = require('../helpers/thirdParty.api');
const fs = require('fs');
const handlebar = require('handlebars');
const path = require('path');
const { EXT_EMAIL_FPT, FROM_EMAIL, SUBJECT_MAIL_OTP } = require("../helpers/constant");
const { default: mongoose } = require("mongoose");

const cryptrOtp = new Cryptr('OTP_SECCRET');

const genOTP = async (req, res) => {
  try {

    const { email } = req.body
    let resData = {}
    const userFound = await userModel.findUserByEmail(email.toLowerCase());
    console.log(userFound)
    if (!userFound) {
      return res.json(rsErrorNotFound('Email'))
    }

    const otpFound = await otpModel.findGenOtp({ email: email.toLowerCase() })
    if (otpFound) {
      resData = {
        expiredTime: +new Date(otpFound.expiredTime),
      }

      try {
        await sendMailOtp({
          email,
          otp: cryptrOtp.decrypt(otpFound.otp),
          expiredTime: otpFound.expiredTime
        })
      } catch (error) {
        return res.json(rsError(412, "Send mail error"))
      }

      return res.json(rsSuccess(resData));
    }

    const otp = generateOTP();
    const otpEncrypt = cryptrOtp.encrypt(otp)

    const userOtp = await otpModel.createOtp({ email: email.toLowerCase(), otp: otpEncrypt })

    resData = {
      expiredTime: +new Date(userOtp.expiredTime),
    }
    console.log("otp: ", otp);


    try {
      await sendMailOtp({
        email,
        otp,
        expiredTime: userOtp.expiredTime
      })
    } catch (error) {
      return res.json(rsError(412, "Send mail error"))
    }

    return res.json(rsSuccess(resData))


  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

const authenOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpFound = await otpModel.findOtpActive({ email: email.toLowerCase() });

    if (!otpFound) {
      return res.json(rsError(410, 'OTP is expired.'));
    }

    const otpExact = cryptrOtp.decrypt(otpFound.otp);

    if (otp !== otpExact) {
      return res.json(rsError(411, 'OTP is wrong.'))
    }

    const userFound = await userModel.findUserByEmail(email.toLowerCase());

    let bodyUpdateOtp = {};
    bodyUpdateOtp.isActive = 0;

    otpModel.updateOtp({ _id: otpFound._id }, bodyUpdateOtp);

    const token = await genToken(userFound);

    const resData = {
      token,
    }

    return res.json(rsSuccess(resData))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

async function sendMailOtp(data) {
  try {
    const timeExpired = new Date(data.expiredTime)
    console.log(data.expiredTime)
    const time = `${timeExpired.getHours()}:${timeExpired.getMinutes()} ${timeExpired.getDate()}/${timeExpired.getMonth() + 1}/${timeExpired.getFullYear()}`
    console.log(time)
    const dataSendMail = {
      name: data.email.replace(EXT_EMAIL_FPT, ''),
      otp: data.otp,
      time
    }

    const source = fs.readFileSync(path.join(process.cwd(), 'src', 'api', 'v1', 'helpers', 'mail_otp_template.hbs'), 'utf8');
    const template = handlebar.compile(source);
    const template_html = template(dataSendMail)

    const bodySendMail = {
      FromEmail: FROM_EMAIL,
      Recipients: data.email,
      Subject: SUBJECT_MAIL_OTP,
      Body: template_html,
    };

    const resSendMail = await thirdPartyApi.sendMail(bodySendMail);
    if (resSendMail.Status !== "Success") {
      console.log('res send mail: ', resSendMail);
      throw new Error(resSendMail.Description)
    }
  } catch (error) {
    console.log("err send mail in third party: ", error);
    throw error;
  }
}

const checkVote = async (req, res) => {
  try {
    const decode = req.jwtDecode;
    const { idea_id } = req.query
    const userFound = await userModel.findUserByEmail(decode.email)

    const checkVote = await ideaModel.getOneIdea({ _id: mongoose.Types.ObjectId(idea_id), author: userFound._id })

    return res.json(rsSuccess({
      is_voted: checkVote ? true : false
    }))

  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

const loadDep = async (req, res) => {
  try {
    const resData = await userModel.loadDep();
    return res.json(rsSuccess(resData))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

async function genToken(userFound) {
  try {
    const dataToken = userFound;

    console.log(dataToken)

    const token = await jwt.generateToken(dataToken, config.token_secret, config.token_time_life);
    return token;

  } catch (error) {
    console.log('err gen token: ', error);
    throw error
  }
}

function generateOTP() {

  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

module.exports = {
  genOTP,
  authenOtp,
  loadDep,
  checkVote
}
