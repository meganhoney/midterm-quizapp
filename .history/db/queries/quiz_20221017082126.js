const db = require('../connection');


const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes WHERE public = true ORDER BY id DESC LIMIT 10;')
    .then(data => {
      return data.rows;
    });
};

cons getQuizzesById = (id) => {
  return db.query()
}

module.exports = { getQuizzes };
