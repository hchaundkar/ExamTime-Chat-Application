var express = require('express');
var router = express.Router();
var passport= require('passport');



var userController = require('../controllers/users-controller.js');
var groupChatController = require('../controllers/groupChat-controller.js');
var createQuizController = require('../controllers/createQuiz-controller.js');



router
  .route('/users/register')
  .post(userController.register);

  router
      .route('/users/login')
      .post(userController.login);



router
    .route('/chat/sendInvite')
    .post(groupChatController.sendInvite);

router
    .route('/chat/createRoom')
    .post(groupChatController.createRoom);

router
    .route('/chat/addMember')
    .post(groupChatController.addMember);

router
    .route('/chat/getAllRooms')
    .get(groupChatController.getAllRooms);

router
    .route('/createQuiz/createQuiz')
    .post(createQuizController.createQuiz);

router
    .route('/fetchQuiz/getQuiz')
    .get(createQuizController.getQuiz);

router
    .route('/createQuiz/sendScore')
    .post(createQuizController.sendScore);



module.exports = router;
