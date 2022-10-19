/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/user', (req, res) => {
  const userId = req.session.userID;
  userQueries.getUserById(userId)
    .then(user => {
      res.json({ user })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

router.get('/quizzes', (req, res) => {
  const userId = req.session.userID;
  userQueries.getQuizzesByUserId(userId)
    .then(quizzes => {
      res.json({ quizzes })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

router.get('/results', (req, res) => {
  const userId = req.session.userID;
  userQueries.getResultsByUserId(userId)
    .then(results => {
      res.json({ results })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

module.exports = router;
