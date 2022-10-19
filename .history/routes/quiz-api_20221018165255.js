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

const createOptionsData = (questionsArr, quizObj) => {
  const optionsArr = [];
  for (let x = 0; x < questionsArr.length; x++) {
    const optionObj = {};
    optionObj.questionId = questionsArr[x].id;
    optionObj.options = quizObj["options" + x];
    optionsArr.push(optionObj);
  }
  return optionsArr;
}

const createAnswersData = (questionsArr, quizObj) => {
  const answersArr = [];
  for (let x = 0; x < questionsArr.length; x++) {
    const answerObj = {};
    answerObj.questionId = questionsArr[x].id;
    answerObj.answers = quizObj["answers" + x];
    answersArr.push(answerObj);
  }
  return answersArr;
}

router.post('/', (req, res) => {
  const quizData = req.body;
  let saveQuestions;
  let returnData;

  quiz.postQuizzes(quizData)
    .then(data => {
      returnData = data;
      const questionsArr = createQuestionsData(data.id, quizData.questions, quizData.questions_type);
      return quiz.postQuestions(questionsArr);
    })
    .then(data => {
      saveQuestions = data;
      const optionsData = createOptionsData(data, quizData);
      return quiz.postOptions(optionsData);
    })
    .then(() => {
      const answersData = createAnswersData(saveQuestions, quizData);
      return quiz.postAnswers(answersData);
    })
    .then(() => {
      return res.json(returnData);
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