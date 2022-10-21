/*
 HOME SCREEN
 */
SELECT
  *
FROM
  quizzes
WHERE
  public = true
ORDER BY
  id DESC
LIMIT
  10;

/*
 Take Quiz GET
 */
SELECT
  *
FROM
  quizzes
WHERE
  id = 1;

SELECT
  *
FROM
  questions
WHERE
  quiz_id = 1;

SELECT
  *
FROM
  options
WHERE
  question_id = 1;

SELECT
  *
FROM
  answers
WHERE
  question_id = 1;

/*
 POST QUIZ
 */
INSERT INTO
  quizzes (user_id, title, topic, public)
VALUES
  (1, 'a', 'b', true);

INSERT INTO
  questions(quiz_id, question, question_type)
VALUES
  (1, 'A', 'B'),
  (1, 'A', 'B') RETURNING *;

INSERT INTO
  options(question_id, option)
VALUES
  (16, 'a'),
  (16, 'b') RETURNING *;

/*
 All attempted quiz
 */
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
      results.user_id = 1
    ORDER BY
      results.quiz_id DESC
    LIMIT
      10
  ) as results
ORDER by
  created_at DESC;

/*
 Attempted Quiz by Id
 */
SELECT
  results.*,
  quizzes.title AS title,
  quizzes.topic AS topic,
  users.name AS name
FROM
  results
  JOIN quizzes ON results.quiz_id = quizzes.id
  JOIN users ON results.user_id = users.id
WHERE
  results.id = 1;

/*
 All Quizzes created by the user
 */
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
  quizzes.user_id = 2
  AND quizzes.completed_at IS NULL
GROUP BY
  quizzes.id
ORDER BY
  created_at DESC;

/*
 Get a quiz by Id
 */
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
  quizzes.id = 2
  AND quizzes.completed_at IS NULL
GROUP BY
  quizzes.id;

/*
 Get results by quiz id
 */
SELECT
  *
FROM
  results
WHERE
  quiz_id = 1
ORDER BY
  created_at DESC;

/*
 INSERT RESULT
 */
INSERT INTO
  results (
    user_id,
    quiz_id,
    score,
    correct_answers,
    total_questions
  )
VALUES
  (1, 1, 67, 1, 3) RETURNING *;


select to_char(created_at,'DDD MM/DD/YYYY') As CREAT
