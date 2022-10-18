/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const quiz = require('./../db/queries/quiz');

router.get('/', (req, res) => {

  quiz.getQuizzes()
    .then(data => res.json(data))
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id',(req,res)=>{
  const userId = req.session.userId;
  const quizId = req.params.id;
  if(!userId) {
    res.status(401)
    .send('You need to be login');
  }

  quiz.getQuizzesById(quizId)
  .then(data => res.json(data))
  .catch((err) =>{

  })

});

module.exports = router;
