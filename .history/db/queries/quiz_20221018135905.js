const db = require('../connection');


const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes WHERE public = true ORDER BY id DESC LIMIT 10;')
    .then(data => {
      return data.rows;
    });
};

const postQuizzes = (data) => {
  const params = [data.user_id, data.title, data.topic, data.public];

  return db.query(`
  INSERT INTO
  quizzes (user_id, title, topic, public)
  VALUES
  ($1, $2, $3, $4)
  RETURNING *;


  `, params)
    .then(data => data.rows[0]);

};

const postQuestions = (data) => {
  let query = `
  INSERT INTO
  questions(quiz_id, question, question_type)
  VALUES`;
  const params = [];

  for (let x = 0; x < data.length; x++) {
    query += x + 1 === data.length ? `($${x * 3 + 1},$${x * 3 + 2},$${x * 3 + 3})\n` : `($${x * 3 + 1},$${x * 3 + 2},$${x * 3 + 3}),\n`;
    params.push(data[x].quizId, data[x].question, data[x].questionType);
  }
  query += '\nRETURNING *;';
  console.log("query\n", query);
  console.log("params\n", params);

  return db.query(query, params)
    .then(data => data.rows);
};

/*
 [
  { questionId: 25, options: [ 'e', 'f', 'g', 'h' ] },
  { questionId: 26, options: [ 'a', 'b', 'c', 'd' ] }
]
*/
const postOptions = (data) => {
  let query = `
  INSERT INTO
  options(question_id, option)
  VALUES\n`;
  const params = [];
  let counter = 0;

  for (const each of data) {
    for (let x = 0; x < each.options.length; x++) {
      counter++;
      query += x + 1 === each.options.length ? `($${ counter + 1},$${ counter + 2})\n` : `($${ counter + 1},$${x * counter + 2}),\n`;
      console.log("x", x, 'query\n', query)
      params.push(each.questionId, each.options[x]);
    }
  }
  query += '\nRETURNING *;';
  console.log("query\n", query);
  console.log("params\n", params);

  return db.query(query, params)
    .then(data => data.rows);
};


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
  postQuizzes,
  postQuestions,
  postOptions
};
