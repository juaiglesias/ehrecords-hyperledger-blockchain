const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patients.controller');

router.get('/', (_, res) => {
    patientsController.getAllPatients()
        .then((patients) => {
            res.json(patients);
        });
});

router.post('/', (req, res) => {
    patientsController.createPatient(req.body.key, req.body.firstName, req.body.lastName, req.body.age, req.body.address)
        .then((patient) => {
            res.json(patient);
        })
});

router.get('/:id', (req, res) => {
    patientsController.getPatient(req.params.id)
        .then((patient) => {
            res.json(patient);
        });
})

module.exports = router;