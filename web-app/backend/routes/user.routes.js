const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/enroll/', (req, res, next) => {
        usersController.enroll(req.body.username, req.body.secret, req.body.password)
            .then((response) => {
                console.log(response);
                res.status(200).send(response);
            }).catch((err) => {
                next(err);
            });
});

router.post('/login/', (req, res, next) => {
    usersController.login(req.body.username, req.body.password)
        .then((token) => {
            console.log(`Token of user ${req.body.username}: ${token}`);
            res.status(200).send({ token });
        }).catch((err) => {
            next(err);
        });
});

module.exports = router;