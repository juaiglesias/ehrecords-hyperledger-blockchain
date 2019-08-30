const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patients.controller');

router.get('/', (req, res, next) => {
    patientsController.getAllPatients(req.contract)
        .then((patients) => {
            res.json(patients);
        }).catch((error) => {
            next(error);
        });
});

router.post('/', (req, res, next) => {
    patientsController.createPatient(req.contract, req.body.key, req.body.firstName, req.body.lastName, req.body.age, req.body.address)
        .then((patient) => {
            res.json(patient);
        }).catch((error) => {
            next(error);
        });
});

router.get('/:id', (req, res, next) => {
    patientsController.getPatient(req.contract, req.params.id)
        .then((patient) => {
            res.json(patient);
        }).catch((error) => {
            next(error);
        });
});

module.exports = router;