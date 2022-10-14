const db = require('../connection');

const getQuizzes = () => {
  return db.query('SELECT * FROM ;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
