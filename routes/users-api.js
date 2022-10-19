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

router.get('/my_quizzes', (req, res) => {
  const userId = req.session.userID;
  userQueries.getQuizzesByUserId(userId)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

router.get('/my_results', (req, res) => {
  const userId = req.session.userID;
  userQueries.getResultsByUserId(userId)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

module.exports = router;
