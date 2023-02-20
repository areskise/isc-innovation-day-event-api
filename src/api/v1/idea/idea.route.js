const express = require('express');
const router = express.Router();

const ideaController = require('./idea.controller');
const validate = require('../middlewares/validate.middleware');
const { addIdeaSchema, getListIdeaSchema, updateIdeaSchema } = require('./idea.validation');

const { isAuth, isAuthOption } = require('../middlewares/auth.middleware');
const { apiLimiter1h5 } = require('../middlewares/limit.middleware');

router.route('/')
  .get(validate(getListIdeaSchema), isAuthOption, ideaController.getListIdea)
  .post(isAuth, validate(addIdeaSchema), ideaController.addIdea)
  .put(isAuth, validate(updateIdeaSchema), ideaController.updateIdea);

router.route('/me')
  .get(validate(getListIdeaSchema), isAuth, ideaController.getListIdeaByMe);

router.route('/:id')
  .get(isAuthOption, ideaController.getIdea);

module.exports = router;