const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserById = (user_id) => {
  return db.query(`
  SELECT * FROM users WHERE id = $1;
  `, [user_id])
  .then((data => {
    return data.rows;
  }))
  .catch((err) => {
    console.log(err.message);
  });
};

const getQuizzesByUserId = (user_id) => {
  return db.query(`
  SELECT * FROM quizzes WHERE user_id = $1;
  `, [user_id])
  .then((data => {
    return data.rows;
  }))
  .catch((err) => {
    console.log(err.message);
  });
}
module.exports = {
  getUsers,
  getUserById,
  getQuizzesByUserId
};
