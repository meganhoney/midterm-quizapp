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
  (1, 'A', 'B')
  RETURNING *;
