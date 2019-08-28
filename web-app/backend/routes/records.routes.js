const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/records.controller');

router.post('/', (req, res, next) => {
    recordsController.addRecordToPatient(req.body.key, req.body.information, req.body.doctorId)
        .then((patient) => {
            res.json(patient);
        }).catch((error) => {
            next(error);
        });
})

module.exports = router;