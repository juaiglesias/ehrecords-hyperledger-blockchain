const blockchainPatientsService = require('../services/blockchain.patients.service');

exports.getPatient = async function(req, res, next) {
    try {
        let response = {};
        const result = await blockchainPatientsService.getPatient(req.contract, req.params.id);
        response.patient = JSON.parse(result.toString());
        console.log(`Transaction has been evaluated, result is: ${JSON.stringify(response)}`);

        res.json(response);
    } catch (err) {
        next(err);
    }
} 

exports.getAllPatients = async function(req, res, next) {
    try {
        let response = {};
        const result = await blockchainPatientsService.getAllPatients(req.contract);
        
        response.patients = JSON.parse(result.toString());
        console.log(`Transaction has been evaluated, result is: ${JSON.stringify(response)}`);

        res.json(response);
    } catch (err) {
        next(err);
    }
}

exports.createPatient = async function(req, res, next) {
    try {
        let response = {};
        const key = req.body.key;

        const result = await blockchainPatientsService.createPatient(req.contract, key, req.body.firstName, req.body.lastName, req.body.age, req.body.address);
        
        response.newPatient = { Key: key, Value: JSON.parse(result.toString()) };
        
        console.log(`Transaction has been evaluated, result is: ${JSON.stringify(response)}`);
        
        res.json(response);
    } catch (err) {
        next(err);
    }
}