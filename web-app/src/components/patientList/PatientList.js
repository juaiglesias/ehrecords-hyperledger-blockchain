import React from 'react';

import PatientSummaryCard from '../patient/PatientSummaryCard';

import './PatientList.css';

export default function PatientList(props) {
    const patients = props.patients;
    const filter = props.filter;
    //First filter the patients by the text
    const listPatients = patients.filter(function(patient){
        return (patient.id.includes(filter) || 
                `${patient.firstName} ${patient.lastName}`.includes(filter) ||
                `${patient.lastName} ${patient.firstName}`.includes(filter));
    }).map((patient) =>
        <li key={patient.id}><PatientSummaryCard value={patient} /></li>
    );

    return (
        <ul>
            {listPatients}
        </ul>
    );
}