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
  quizzes_id = 1;
