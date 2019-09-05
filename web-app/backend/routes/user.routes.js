const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/enroll/', (req, res, next) => {
    usersController.enroll(req.body.username, req.body.secret, req.body.password)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            next(error);
        })
});

router.post('/login/', (req, res, next) => {
    usersController.login(req.body.username, req.body.password)
        .then((token) => {
            res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        })
        .catch((error) => {
            next(error);
        })
});

module.exports = router;