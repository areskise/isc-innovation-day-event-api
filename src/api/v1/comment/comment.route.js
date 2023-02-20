const express = require('express');
const router = express.Router();

const commentController = require('./comment.controller');
const validate = require('../middlewares/validate.middleware');
const { getListCommentSchema, addCommentSchema } = require('./comment.validation');

const { isAuth } = require('../middlewares/auth.middleware');

router.route('/')
  .get(validate(getListCommentSchema), commentController.getListComment);

router.route('/')
  .post(isAuth, validate(addCommentSchema), commentController.addComment);

module.exports = router;