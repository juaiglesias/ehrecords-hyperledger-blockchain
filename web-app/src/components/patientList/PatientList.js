import React from 'react';

import PatientSummaryCard from '../patient/PatientSummaryCard';

import './PatientList.css';

export default function PatientList(props) {
    const patients = props.patients;
    const listPatients = patients.map((patient) =>
        <li><PatientSummaryCard key={patient.id} value={patient} /></li>
    );

    return (
        <ul>
            {listPatients}
        </ul>
    );
}