const db = require('../connection');

const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes ORDER BY ;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
