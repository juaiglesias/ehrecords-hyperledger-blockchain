const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patients.controller');

router.get('/', (req, res) => {
    patientsController.getAllPatients()
        .then((patients) => {
            res.send(JSON.parse(patients))
        });
});

router.get('/:id', (req, res) => {
    patientsController.getPatient(req.params.id)
        .then((patient) => {
            res.send(JSON.parse(patient))
        });
})

module.exports = router;