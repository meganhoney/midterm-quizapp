DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  public BOOLEAN NOT NULL DEFAULT TRUE,
  number_of_attempts BIGINT NOT NULL DEFAULT 0
);

SELECT * FROM quizzes
JOIN questions ON id = questions.quiz_id
WHERE user_id = 1
