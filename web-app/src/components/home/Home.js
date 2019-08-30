import React from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export default function Home() {
    return (
        <Container maxWidth="sm" component="main" className={"MuiContainer--01"}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            EHRecords
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" component="p">
                Utilizando la tecnología Blockchain para almacenar y compartir información de 
                pacientes entre diferentes hospitales, clínicas y centro de investigación.
            </Typography>
        </Container>
    );
}