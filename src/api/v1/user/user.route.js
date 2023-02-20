const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const validate = require('../middlewares/validate.middleware');
const { genOtpSchema, authenOtpSchema } = require('./user.validation');
const { isAuth } = require('../middlewares/auth.middleware');
const { apiLimiter1p1, apiLimiter5p5 } = require('../middlewares/limit.middleware');

router.route('/gen-otp')
  .post( apiLimiter1p1, userController.genOTP);

router.route('/authen')
  .post( apiLimiter5p5, validate(authenOtpSchema), userController.authenOtp);

router.route('/load-dep')
  .get(userController.loadDep);


// router.use(isAuth);

router.route('/check-vote').get(isAuth, userController.checkVote);

module.exports = router;