const db = require('../connection');


const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes WHERE public = true ORDER BY id DESC LIMIT 10;')
    .then(data => {
      return data.rows;
    });
};

const getQuizzesById = (id) => {
  return db.query(`
  SELECT
  *
  FROM
    quizzes
  WHERE
    id = $1;


  `, [id])
    .then(data => data.rows);
}

const getQuestionsByQuizzesId = (quizId) => {
  return db.query(`
  SELECT
  *
  FROM
    questions
  WHERE
    quiz_id = $1;


  `, [quizId])
    .then(data => data.rows);
}

const getOptionsByQuestionsId = (questionId) => {
  return db.query(`
  SELECT
  *
  FROM
    options
  WHERE
    question_id = $1;


  `, [questionId])
    .then(data => data.rows);
}

const attachOptions = async (questions) => {
  const newQuestions = await Promise.all(questions.map(async (question) => {
    question.options = await quiz.getOptionsByQuestionsId(question.id);
    return question
  }));

  return newQuestions;
}

const attachAnswers = async (questions) => {
  const newQuestions = await Promise.all(questions.map(async (question) => {
    question.options = await quiz.getAnswerssByQuestionsId(question.id);
    return question
  }));

  return newQuestions;
}



module.exports = { getQuizzes, getQuizzesById, getQuestionsByQuizzesId, getOptionsByQuestionsId, attachOptions };
