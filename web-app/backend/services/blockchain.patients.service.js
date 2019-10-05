exports.getAllPatients = async function(contract) {
    // Evaluate the specified transaction.
    // GetAllPatients transaction
    return await contract.evaluateTransaction('GetAllPatients');
}

exports.getPatient = async function(contract, patientId) {
    // Evaluate the specified transaction.
    // GetPatient required ID of the patient
    return await contract.evaluateTransaction('GetPatient', patientId);
}

exports.createPatient = async function(contract, idPatient, firstName, lastName, age, address) {
    // Create patient require ID of the patient, firstName, lastName, age and address
    return await contract.submitTransaction('CreatePatient', idPatient, firstName, lastName, age, address);
}