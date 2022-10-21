/*
 * All routes for attempted quizzes are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const quiz = require('../db/queries/quiz');
const helper = require('../lib/helper');

router.get('/', (req, res) => {
  const userId = req.session.userID;


  quiz.getResultsByUserId(userId)
    .then(data => res.json(data))
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const resultId = req.params.id;

  quiz.getResultsByResultId(resultId)
    .then(data => res.json(data))
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

/*
API POST when submitting an attempted quiz
*/



router.post('/', (req, res) => {
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
    })
    .then((result)=>{
      quizObj = result;
      return quiz.updateNumberOfAttemptsById

    })

    then(data => {
      res.json(data);
    })

});

module.exports = router;
