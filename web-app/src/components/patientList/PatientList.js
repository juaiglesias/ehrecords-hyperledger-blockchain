import PatientCard from '../patient/PatientCard';
import React from 'react';

export default function PatientList(props) {
    const patients = props.patients;
    const filter = props.filter;
    //First filter the patients by the text
    const listOfPatients = patients.filter(function(patient){
        return (patient.Key.includes(filter) || 
                `${patient.Value.firstName} ${patient.Value.lastName}`.includes(filter) ||
                `${patient.Value.lastName} ${patient.Value.firstName}`.includes(filter));
    }).map((patient) =>
        <li key={patient.Key}><PatientCard {...patient} /></li>
    );

    return (
        <ul>
            {listOfPatients}
        </ul>
    );
}