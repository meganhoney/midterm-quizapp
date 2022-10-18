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
  quizzes.title AS title,
  quizzes.topic AS topic,
  questions.question_type AS question_type,
  questions.question AS question,
  options.option AS option,
  answers.answer AS answer
FROM
  quizzes
  JOIN questions ON quizzes.id = questions.quiz_id
  JOIN options ON questions.id = options.question_id
  JOIN answers ON questions.id = answers.question_id
WHERE
  user_id = 1;

  `)
    .then(data => data.rows);
}

module.exports = { getQuizzes };
