/*
 * All routes for quizzes created by the user are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const quiz = require('../db/queries/quiz');

router.get('/', (req, res) => {
  const userId = req.session.userID;

  quiz.getQuizzesByUserId(userId)
    .then(data => res.json(data))
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const resultId = req.params.id;

  quiz.getQuizOnlyById(resultId)
    .then(data => {res.json(data))
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});



module.exports = router;
