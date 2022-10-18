/*
HOME SCREEN
*/
SELECT * FROM quizzes WHERE public = true ORDER BY id DESC LIMIT 10;


/*
Take Quiz GET
*/
SELECT quizzes.title AS title, quizzes.topic AS topic, questions.question_type AS question_type, questions.  FROM quizzes
JOIN questions ON quizzes.id = questions.quiz_id
JOIN answers ON questions.id = answers.question_id
WHERE user_id = 1;



