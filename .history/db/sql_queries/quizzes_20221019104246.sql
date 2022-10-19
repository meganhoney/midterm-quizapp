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
  quizzes.topic AS topic
FROM
  results
  JOIN quizzes ON results.quiz_id = quizzes.id
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
  quizzes.created_at
FROM
  quizzes
  JOIN result
WHERE
  user_id = 1
  AND completed_at IS NULL;
