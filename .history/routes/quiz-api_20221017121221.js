/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const quiz = require('./../db/queries/quiz');

router.get('/', (req, res) => {

  quiz.getQuizzes()
    .then(data => res.json(data))
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

/*
@param id -> Quiz id to retrieve
*/
router.get('/:id', (req, res) => {
  //will add check for user being logged in later

  const quizId = req.params.id;
  let quizObj;
  quiz.getQuizzesById(quizId)
    .then((quizzes) => {
      quizObj = quizzes[0];
      return quiz.getQuestionsByQuizzesId(quizId);
    })
    .then((questions) => {
      // console.log(data2);
      quizObj.questions = questions;
      //res.json(quizObj);
      return attachOptions(questions);
    })
    .then((questions) => {

      quizObj.questions = questions;
      //console.log(quizObj)
      res.json(quizObj);
    })
    .catch((err) => {
      res.status(500)
        .json({ error: err.message });
    });

});

const attachOptions = async (questions) => {
  const newQuestions = await Promise.all(questions.map(async (question) => {
    question.options = await quiz.getOptionsByQuestionsId(question.id);
    //console.log(question);
    return question
  }));

  return newQuestions;
}


module.exports = router;
