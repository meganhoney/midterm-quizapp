DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  public NOT NULL DEFAULT TRUE,
  number_of_attempts BIGINT NOT NULL DEFAULT 0
);
