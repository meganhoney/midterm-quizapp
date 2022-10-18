const db = require('../connection');


const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes WHERE public = true ORDER BY id DESC LIMIT 10;')
    .then(data => {
      return data.rows;
    });
};

const postQuizzes=(data) =>{
  const params = [data.user_id, data.title, data.topic, data.public];

  return db.query(`
  INSERT INTO
  quizzes (user_id, title, topic, public)
  VALUES
  ($1, $2, $3, $4)
  RETURNING *;


  `,params)
  .then(data => data.rows[0]);

};

const postQuestions



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

const getOptionsByQuestionsId = (questionId) => {
  return db.query(`
  SELECT
  *
  FROM
    options
  WHERE
    question_id = $1;


  `, [questionId])
    .then(data => data.rows);
}

const getAnswersByQuestionsId = (questionId) => {
  return db.query(`
  SELECT
  *
  FROM
    answers
  WHERE
    question_id = $1;


  `, [questionId])
    .then(data => data.rows);
}

const attachOptions = async (questions) => {
  const newQuestions = await Promise.all(questions.map(async (question) => {
    question.options = await getOptionsByQuestionsId(question.id);
    return question
  }));

  return newQuestions;
}

const attachAnswers = async (questions) => {
  const newQuestions = await Promise.all(questions.map(async (question) => {
    question.answers = await getAnswersByQuestionsId(question.id);
    return question
  }));

  return newQuestions;
}



module.exports = {
  getQuizzes,
  getQuizzesById,
  getQuestionsByQuizzesId,
  getOptionsByQuestionsId,
  getAnswersByQuestionsId,
  attachOptions,
  attachAnswers,
  postQuizzes
};
