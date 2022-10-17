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
    id = ?;


  `, [id])
    .then(data => data.rows);
}

const getQuestionsByQuizzesId = (id) => {
  return db.query(`
  SELECT
  *
  FROM
    questions
  WHERE
    quizzes_id = ?;


  `)
    .then(data => data.rows);
}


module.exports = { getQuizzes, getQuizzesById };
