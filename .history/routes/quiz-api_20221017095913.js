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
  quiz.getQuizzesById(quizId)
    .then(data => {
      const newData = attachQuestions(data);
      return res.json(newData)
    })
    .catch((err) => {
      res.status(500)
        .json({ error: err.message });
    });

});

const attachQuestions = (quizObj) => {
  const newQuizObj = quizObj;
  const questions = [];
  async () => {
  for (const each of newQuizObj) {
    quiz.getQuestionsByQuizzesId(each.id)
      .then(data => questions.push(data));
  }
  console.log(questions);
  //console.log(newQuizObj);
  return newQuizObj;
}

module.exports = router;
