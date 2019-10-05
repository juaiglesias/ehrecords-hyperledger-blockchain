const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/enroll/', usersController.enroll);

router.post('/login/', usersController.login);

module.exports = router;