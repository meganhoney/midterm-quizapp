/*
 * All routes API for quizzes are defined here
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

// Get quiz id from title
// router.get("/title", (req, res) => {
//   quiz.getQuizIdByTitle()
// })

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
    optionObj.options = !quizObj["options" + x] ? [] : quizObj["options" + x];
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

  console.log("quiz obj", quizData);


  quiz.postQuizzes(quizData)
    .then(data => {
      console.log("Quiz save returned obj: ",data);
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
    .catch(err => {
      console.log("Error saving new quiz", err);
      return res.status(500).json({ error: err.message })
    });

})

router.post('/temp', (req, res) => {
  const quizData = req.body;
  console.log("quiz obj", quizData);
  res.send("saved");
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
