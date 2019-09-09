const express = require('express');
const router = express.Router();
const blockchainUsersController = require('../controllers/blockchain.users.controller');

router.get('/', (req, res, next) => {
    blockchainUsersController.enrollAdmin()
        .then((response) => {
            console.log(response);
            res.status(200).send(response);
        })
        .catch((err) => {
            next(err);
        })
});

router.get('/register/:id', (req, res, next) => {
    blockchainUsersController.registerUser(req.params.id)
        .then((response) => {
            console.log(response);
            res.status(200).send(response);
        })
        .catch((err) => {
            next(err);
        })
});

module.exports = router;