const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/records.controller');

router.post('/', recordsController.addRecordToPatient);

module.exports = router;