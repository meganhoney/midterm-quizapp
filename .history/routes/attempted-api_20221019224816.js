/*
 * All routes for attempted quizzes are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const quiz = require('../db/queries/quiz');

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
const validateAnswers = (quiz, answers) => {
  let correctAnswers = 0;
  const resultObj = {};

  for (const each of quiz.questions) {
    console.log("answers", each.answers);
    //check if multiple answers or just one
    if (each.answers.length === 1) {
      //actual vs guess answer
      console.log(each.answers[0].answer, " vs ", answers[each.id]);
      if (each.answers[0].answer.toUpperCase().trim() === answers[each.id].toUpperCase().trim()) {
        correctAnswers++;
      }
    } else if (each.answers.length === answers[each.id].length) {
      let correct = true

      for (const actual of each.answers) {
        const guessAnswers =  answers[each.id];
        correct = guessAnswers.some(element =>{
          return element.toUpperCase().trim() === actual.answer.toUpperCase().trim();
        })
        console.log(actual.answer, " vs ", answers[each.id]);
        if (!answers[each.id].includes(actual.answer.toUpperCase().trim())) {
          correct = false;
        }
      }

      if (correct) {
        correctAnswers++;
      }
    }
  }
  resultObj.correctAnswers = correctAnswers;
  resultObj.totalQuestion = quiz.questions.length;
  resultObj.score = Math.round(correctAnswers / quiz.questions.length * 100);
  return resultObj;
}


router.post('/', (req, res) => {
  const attemptedAnswers = req.body;
  const quizId = attemptedAnswers.quiz_id;
  const userId = req.session.userID;
  let quizObj;
  console.log("req body", attemptedAnswers);
  console.log("quiz id", quizId);
  console.log("userId", userId);
  quiz.getQuizzesWithQuestionsOptionsAnswersById(quizId)
    .then((quiz) => {
      quizObj = quiz;
      const result = validateAnswers(quizObj, attemptedAnswers);
      result.quizId = quizId;
      result.userId = userId;
      res.send(result);
    })

});

module.exports = router;
