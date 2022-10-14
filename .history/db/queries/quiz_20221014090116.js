const db = require('../connection');

module.exports = {
const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes ORDER BY id DESC LIMIT 10;')
    .then(data => {
      return data.rows;
    });
};

};
