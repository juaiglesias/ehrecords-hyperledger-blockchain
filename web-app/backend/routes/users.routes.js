const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/', (_, res) => {
    usersController.registerUser()
        .then(() => {
            res.send();
        });
});

router.get('/admin',(_,res) => {
    usersController.registerAdmin()
        .then(() => {
            res.send();
        });
});

module.exports = router;