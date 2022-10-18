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

const getOptionsBQuestionsId = (questionId) => {
  return db.query(`
  SELECT
  *
  FROM
    options
  WHERE
    question_id = $1;


  `, [quizId])
    .then(data => data.rows);
}





module.exports = { getQuizzes, getQuizzesById, getQuestionsByQuizzesId };
