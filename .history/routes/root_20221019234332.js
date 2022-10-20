/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const helper = require('../lib/helper');
const quiz = require('./../db/queries/quiz');

//All public quizzes
router.get('/', (req, res) => {
  res.render('index');
});

//All quizzes created by the user
router.get('/my_quizzes', (req, res) => {
  res.render('my_quizzes');
});


//Create a new quiz view
router.get('/my_quizzes/new', (req, res) => {
  res.render('new_quiz');
});


//All quizzes created by the user with all people attempted
router.get('/my_quizzes/:id', (req, res) => {
  console.log('im here')
  res.render('quiz_all_results');
});

//Attempt quiz post
router.post('/score', (req, res) => {
  const attemptedAnswers = req.body;
  const quizId = attemptedAnswers.quiz_id;
  const userId = req.session.userID;
  let quizObj;
  //console.log("req body", attemptedAnswers);
  //console.log("quiz id", quizId);
  //console.log("userId", userId);
  quiz.getQuizzesWithQuestionsOptionsAnswersById(quizId)
    .then((quizData) => {
      quizObj = quizData;
      const result = helper.validateAnswers(quizObj, attemptedAnswers);
      result.quizId = quizId;
      result.userId = userId;
      return quiz.postResults(result);
    }).then(data => {
      res.redirect(`/attempted/${data.id}`);
    })
    
})


//All quizzes attempted by the user
router.get('/attempted', (req, res) => {
  res.render('my_results');
});

//Detail report of the quiz attempted
router.get('/attempted/:id', (req, res) => {
  res.render('score_quiz');
});



//Details of a quiz by id
router.get('/:id', (req, res) => {
  res.render('take_quiz');
});

//Login a user
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  req.session.userID = userId;
  res.redirect("/");
});

module.exports = router;
