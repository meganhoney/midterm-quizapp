/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});


router.get('/user/quizzes', (req, res) => {
  res.render('my_quizzes');
});

router.get('/attempted', (req, res) => {
  res.render('my_results');
});

router.get('/attempted/:id', (req, res) => {
  res.render('my_sc');
});

router.get('/my_quizzes/new', (req, res) => {
  res.render('new_quiz');
});

router.get('/:id', (req, res) => {
  res.render('take_quiz');
});


router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  req.session.userID = userId;
  res.redirect("/");
});

module.exports = router;
