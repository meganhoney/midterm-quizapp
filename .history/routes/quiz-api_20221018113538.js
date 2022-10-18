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
Post for creating a new quiz
*/
const createQuestionsData = (quizId, questions, questionsType) => {
  const questionsArr = [];
  for (let x = 0; x < questions.length; x++) {
    const obj = {};
    obj.quizId = quizId;
    obj.question = questions[x];
    obj.questionType = questionsType[x];
    questionsArr.push(obj);
  }
  return questionsArr;

}

router.post('/', (req, res) => {
  const quizData = req.body;

  //console.log(quiz)
  quiz.postQuizzes(quizData)
    .then(data => {
      //console.log(data);
      const questionsArr =createQuestionsData (data.quiz_id, quizData.questions, quizData.questions_type);
      console.log("questionsArr", questionsArr);
      return quiz.postQuestions(questionsArr);
    })
    .then(data => {
      console.log("saved questions\n", data)
      res.json(data);

    })
    .catch(err => res.status(500).json({ error: err.message }));

})

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
      return quiz.attachOptions(questions);
    })
    .then((questions) => {
      return quiz.attachAnswers(questions);
    })
    .then((questions) => {
      quizObj.questions = questions;
      res.json(quizObj);
    })
    .catch((err) => {
      res.status(500)
        .json({ error: err.message });
    });

});




module.exports = router;
