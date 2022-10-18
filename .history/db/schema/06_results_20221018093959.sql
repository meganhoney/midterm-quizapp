DROP TABLE IF EXISTS results CASCADE;

CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL,
  score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  
);
