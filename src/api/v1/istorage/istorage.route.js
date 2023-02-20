const express = require('express');
const router = express.Router();

const istorageController = require('./istorage.controller');
const validate = require('../middlewares/validate.middleware');
const validateSchema = require('./istorage.validation');
const config = require('../../../config');
const { isAuth, isAuthOption } = require('../middlewares/auth.middleware');

router.route('/getToken')
    .post(isAuth, validate(validateSchema.getTokenSchema), istorageController.getToken);



module.exports = router;