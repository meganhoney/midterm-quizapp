const db = require('../connection');


const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes WHERE public = true ORDER BY id DESC LIMIT 10;')
    .then(data => {
      return data.rows;
    });
};

cons getQ

module.exports = { getQuizzes };
