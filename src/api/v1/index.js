const express = require('express');
const router = express.Router();
const userRoute = require('./user/user.route');
const ideaTypeRoute = require('./ideaType/ideaType.route');
const ideaRoute = require('./idea/idea.route');
const eventRoute = require('./event/event.route');
const voteRoute = require('./vote/vote.route');
const commentRoute = require('./comment/comment.route');
const istorageRoute = require('./istorage/istorage.route')


router.use('/user', userRoute);

router.use('/event', eventRoute);

router.use('/idea', ideaRoute);

router.use('/comment', commentRoute);

router.use('/ideaType', ideaTypeRoute);

router.use('/istorage', istorageRoute)

// router.use(isAuth);

router.use('/vote', voteRoute);

module.exports = router;