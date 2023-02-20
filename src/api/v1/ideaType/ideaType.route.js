const express = require('express');
const router = express.Router();

const ideaTypeController = require('./ideaType.controller');
const validate = require('../middlewares/validate.middleware');
const { addIdeaTypeSchema } = require('./ideaType.validation');

router.route('/')
  .get(ideaTypeController.getAllIdeaType);

router.route('/')
  .post(validate(addIdeaTypeSchema), ideaTypeController.addIdeaType);

module.exports = router;