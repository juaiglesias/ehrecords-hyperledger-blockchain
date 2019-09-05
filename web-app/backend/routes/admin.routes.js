const express = require('express');
const router = express.Router();
const blockchainUsersController = require('../controllers/blockchain.users.controller');

router.get('/', (req, res, next) => {
    blockchainUsersController.enrollAdmin()
        .then(() => {
            res.send();
        })
        .catch((err) => {
            next(err);
        })
});

router.get('/register/:id', (req, res, next) => {
    blockchainUsersController.registerUser(req.params.id)
        .then((secret) => {
            res.send(secret)
        })
        .catch((err) => {
            next(err);
        })
});

module.exports = router;