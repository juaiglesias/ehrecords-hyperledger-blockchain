import React from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme => ({
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default function AppBody() {
    const classes = useStyles();

    return (
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
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