exports.addRecordToPatient = async function(contract, patientId, information, date, doctorId) {
    // Transaction need ID of the patient, information of the new record, date of the creation
    // of the record and ID of the doctor who created it
    return await contract.submitTransaction('AddRecordToPatient', patientId, information, date, doctorId);
}