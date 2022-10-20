const db = require('../connection');


const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes WHERE public = true ORDER BY id LIMIT 10;')
    .then(data => {
      return data.rows;
    });
};

const getQuizzesByUserId = (userId) => {
  return db.query(`
  SELECT
    quizzes.id,
    quizzes.user_id,
    quizzes.title,
    quizzes.topic,
    quizzes.public,
    quizzes.created_at,
    COUNT (results) AS number_of_attempts
  FROM
    quizzes
    JOIN results ON quizzes.id = results.quiz_id
  WHERE
    quizzes.user_id = $1
    AND quizzes.completed_at IS NULL
  GROUP BY
    quizzes.id
  ORDER BY
    created_at DESC;

`, [userId])
    .then(data => {
      console.log("result", data.rows)
      return data.rows
    });
}

const getQuizOnlyById = (quizId) => {
  return db.query(`
  SELECT
    quizzes.id,
    quizzes.user_id,
    quizzes.title,
    quizzes.topic,
    quizzes.public,
    quizzes.created_at,
    COUNT (results) AS number_of_attempts
  FROM
    quizzes
    JOIN results ON quizzes.id = results.quiz_id
  WHERE
    quizzes.id = $1
    AND quizzes.completed_at IS NULL
  GROUP BY
    quizzes.id;


`, [quizId])
    .then(data => {
      console.log("result", data.rows)
      return data.rows
    });
}

/*
{
  user_id: '1',
  title: 'Final',
  topic: 'Exam',
  public: 'true'
}
*/
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

/*
[
  {
    quizId: 40,
    question: 'WhatToDo',
    questionType: 'Multiple Answers'
  },
  { quizId: 40, question: 'whatisit', questionType: 'Multiple Choice' }
]

*/
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
  VALUES `;
  const params = [];
  let counter = 0;

  for (const each of data) {
    for (let x = 0; x < each.options.length; x++) {
      query += `($${counter + 1},$${counter + 2}),\n`;
      params.push(each.questionId, each.options[x]);
      counter += 2;
    }
  }
  query = query.slice(0, -2);
  query += '\nRETURNING *;';

  return db.query(query, params)
    .then(data => {
      return data.rows
    });
};

/*
 [
  { questionId: 63, answers: [ 'h', 'e' ] },
  { questionId: 64, answers: 'b' }
]

*/
const postAnswers = (data) => {
  let query = `
  INSERT INTO
    answers (question_id, answer)
  VALUES `;
  const params = [];
  let counter = 0;

  for (const each of data) {
    for (let x = 0; x < each.answers.length; x++) {
      query += `($${counter + 1},$${counter + 2}),\n`;
      params.push(each.questionId, each.answers[x]);
      counter += 2;
    }
  }
  query = query.slice(0, -2);
  query += '\nRETURNING *;';

  return db.query(query, params)
    .then(data => {
      return data.rows
    });
};

/*
Post Results to db to the results table
{"correctAnswers":3,"totalQuestion":3,"score":100,"quizId":"2","userId":"2"}
*/
const postResults = (data) => {
  let query = `
  INSERT INTO
  results (
    user_id,
    quiz_id,
    score,
    correct_answers,
    total_questions
  )
  VALUES
  ($1, $2, $3, $4, $5) RETURNING *;
  `;
  const params = [data.userId, data.quizId, data.score, data.correctAnswers, data.totalQuestions];

  return db.query(query, params)
    .then(data => data.rows[0]);
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

/*
Get all results which are the quizzes has attempted
*/
const getResultsByUserId = (userId) => {
  return db.query(`
  select
  *
from
  (
    SELECT
      DISTINCT ON (results.quiz_id) quiz_id,
      results.id AS id,
      results.user_id AS user_id,
      results.created_at AS created_at,
      results.score AS score,
      results.correct_answers AS correct_answers,
      results.total_questions AS total_questions,
      quizzes.title AS title,
      quizzes.topic AS topic
    FROM
      results
      JOIN quizzes ON results.quiz_id = quizzes.id
    WHERE
      results.user_id = $1
    ORDER BY
      results.quiz_id DESC
    LIMIT
      10
  ) as results
ORDER by
  created_at DESC;


  `, [userId])
    .then(data => data.rows);
}

/*
Get result by id
*/
const getResultsByResultId = (resultId) => {
  return db.query(`
      SELECT
      results.*,
      quizzes.title AS title,
      quizzes.topic AS topic
    FROM
      results
      JOIN quizzes ON results.quiz_id = quizzes.id
    WHERE
      results.id = $1;

  `, [resultId])
    .then(data => data.rows);
}

/*
Get result by id
*/
const getResultsByQuizId = (quizId) => {
  return db.query(`
  SELECT
    *
  FROM
    results
  WHERE
    quiz_id = $1
  ORDER BY
    created_at DESC;

  `, [quizId])
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

const attachResults = async (quizzes) => {
  const newQuizzes = await Promise.all(quizzes.map(async (quiz) => {
    quiz.results = await getResultsByQuizId(quiz.id);
    return quiz
  }));

  return newQuizzes;
}

const getQuizzesWithQuestionsOptionsAnswersById = (quizId) => {
  let quizObj;
  return getQuizzesById(quizId)
    .then((quizzes) => {
      quizObj = quizzes[0];
      return getQuestionsByQuizzesId(quizId);
    })
    .then((questions) => {
      return attachOptions(questions);
    })
    .then((questions) => {
      return attachAnswers(questions);
    })
    .then((questions) => {
      quizObj.questions = questions;
      //console.log("quizdata",quizObj);
      return quizObj;
    });
}



module.exports = {
  getQuizzes,
  getQuizzesById,
  getQuizzesByUserId,
  getQuizOnlyById,
  getQuestionsByQuizzesId,
  getOptionsByQuestionsId,
  getAnswersByQuestionsId,
  attachOptions,
  attachAnswers,
  attachResults,
  postQuizzes,
  postQuestions,
  postOptions,
  postAnswers,
  postResults,
  getResultsByUserId,
  getResultsByResultId,
  getResultsByQuizId,
  getQuizzesWithQuestionsOptionsAnswersById
};
