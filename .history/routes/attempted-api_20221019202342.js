/*
 * All routes for attempted quizzes are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const quiz = require('../db/queries/quiz');

router.get('/', (req, res) => {
  const userId = req.session.userID;


  quiz.getResultsByUserId(userId)
    .then(data => res.json(data))
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const resultId = req.params.id;

  quiz.getResultsByResultId(resultId)
    .then(data => res.json(data))
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

/*
API POST when submitting an attempted quiz
*/
router.post('/', (req, res) => {
  const bodyObj = req.body;
  const quizId = bodyObj.quiz_id;
  const userId = req.
  console.log("req body", bodyObj);
  console.log("quiz id", quizId);
  res.status(200).send(bodyObj)
});

module.exports = router;
