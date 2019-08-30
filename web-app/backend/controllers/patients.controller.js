exports.getPatient = async function(contract, id) {
    let response = {};

    // Evaluate the specified transaction.
    // getPatient transaction - requires arg ID
    const result = await contract.evaluateTransaction('GetPatient', id);
    response.patient = JSON.parse(result.toString());
    console.log(`Transaction has been evaluated, result is: ${JSON.stringify(response)}`);

    return response;
} 

exports.getAllPatients = async function(contract) {
    let response = {};

    // Evaluate the specified transaction.
    // GetAllPatients transaction - requires arg ID
    const result = await contract.evaluateTransaction('GetAllPatients');
    response.patients = JSON.parse(result.toString());
    console.log(`Transaction has been evaluated, result is: ${JSON.stringify(response)}`);

    return response;
}

exports.createPatient = async function(contract, key, firstName, lastName, age, address) {
    let response = {};

    // Evaluate the specified transaction.
    // Create transaction
    const result = await contract.submitTransaction('CreatePatient', key, firstName, lastName, age, address);
    
    response.newPatient = { Key: key, Value: JSON.parse(result.toString()) };

    console.log(`Transaction has been evaluated, result is: ${JSON.stringify(response)}`);

    return response;
}