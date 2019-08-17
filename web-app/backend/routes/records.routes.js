const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/records.controller');

router.post('/', (req, res) => {
    recordsController.addRecordToPatient(req.body.key, req.body.information, req.body.doctorId)
        .then((patient) => {
            return res.json(patient);
        })
})

module.exports = router;