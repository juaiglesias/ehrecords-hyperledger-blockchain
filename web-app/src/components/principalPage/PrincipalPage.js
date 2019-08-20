import React from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PatientList from '../patientList/PatientList';


const useStyles = makeStyles(theme => ({
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default function PrincipalPage() {
    const classes = useStyles();

    const pacientes = [
            {'id': 'A', 'firstName': 'Pepe', 'lastName': 'asdas'},
            {'id': 'B', 'firstName': 'PedfWWe', 'lastName': 'asdas'},
            {'id': 'C', 'firstName': 'El pity Martinez, que loco que está'}
    ];

    return (
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Patients
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" component="p">
                List of Patients
            </Typography>
            <PatientList patients={pacientes} />
        </Container>
    );
}