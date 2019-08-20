import React from 'react';

import PatientSummaryCard from '../patient/PatientSummaryCard';

export default function PatientList(props) {
    const patients = props.patients;
    const listPatients = patients.map((patient) =>
        <PatientSummaryCard key={patient.id} value={patient} />
    );

    return (
        <ul>
            {listPatients}
        </ul>
    );
}