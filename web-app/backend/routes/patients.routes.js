const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patients.controller');

router.get('/', patientsController.getAllPatients);

router.post('/', patientsController.createPatient);

router.get('/:id', patientsController.getPatient);

module.exports = router;