/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/:id', (req, res) => {
  res.render('take_quiz');
});

router.get('/my_quizzes/new',(req,res)=>{
  res.render('new_quiz');
})

router.get('/user/:id',(req,res)=>{
  const quizId = req.params.id;
})

module.exports = router;
