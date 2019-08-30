const dateFormat = require('dateformat');

exports.addRecordToPatient = async function(contract, key, information, doctorId) {
    let response = {};
    let actualDate = new Date();
    
    // Evaluate the specified transaction
    const result = await contract.submitTransaction('AddRecordToPatient', key, information, dateFormat(actualDate,"yyyy-mm-dd HH:MM"), doctorId);
    
    response.newPatient = JSON.parse(result.toString());

    console.log(`Transaction has been evaluated, result is: ${JSON.stringify(response)}`);

    return response;
}