const db = require('../connection');


const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes WHERE public = true ORDER BY id LIMIT 10;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getQuizzes };
