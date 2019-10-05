const dateFormat = require('dateformat');
const blockchainRecordsService = require('../services/blockchain.records.service');

exports.addRecordToPatient = async function(req, res, next) {
    try {
        let response = {};
        let actualDate = new Date();
        
        // Evaluate the specified transaction
        const result = await blockchainRecordsService.addRecordToPatient(
                                                            req.contract, 
                                                            req.body.key, 
                                                            req.body.information, 
                                                            dateFormat(actualDate,"yyyy-mm-dd HH:MM"), 
                                                            req.username);
        
        response.newPatient = JSON.parse(result.toString());

        console.log(`Transaction has been evaluated, result is: ${JSON.stringify(response)}`);

        res.json(response);

    } catch (err) {
        next(err);
    }
}