const express = require('express');
const router = express.Router();

const eventController = require('./event.controller');
const validate = require('../middlewares/validate.middleware');
const { addEventSchema, getEventBySlugSchema } = require('./event.validation');

const { isAuth } = require('../middlewares/auth.middleware');

router.route('/')
  .get(validate(getEventBySlugSchema), eventController.getEventBySlug);

router.route('/')
  .post(isAuth, validate(addEventSchema), eventController.addEvent);

module.exports = router;