/*
HOME SCREEN
*/
SELECT * FROM quizzes WHERE public = true ORDER BY id DESC LIMIT 10;


/*
Take Quiz GET
*/
SELECT * FROM quizzes
JOIN questions ON quizzes.id = questions.quiz_id
JOIN answers ON questions.id = answers.qu_id
WHERE user_id = 1;



