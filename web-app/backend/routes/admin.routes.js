const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.get('/', adminController.enrollAdmin);

router.get('/register/:id', adminController.registerUser);

module.exports = router;