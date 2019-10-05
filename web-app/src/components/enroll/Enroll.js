import axios from 'axios';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import { openSnackBar } from '../snackBar/SnackBar';
import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles( theme => ({
    paper: {
        padding: theme.spacing(4),
    }
}));

export default function Enroll(props) {
    const [username, setUsername] = useState('');
    const [secret, setSecret] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

    const classes = useStyles();

    const validateForm = () => {
        let errors = [];
        if (newPassword !== newPasswordConfirmation){
            errors.push("Las contraseñas no coinciden");
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (errors.length) {
            errors.forEach(error => {
                openSnackBar({message: error, type: "error"});
            });
        } else {
            axios.post(`${process.env.REACT_APP_API_URL}/api/user/enroll/`, {
                    username,
                    secret,
                    newPassword
                })
                .then(res => {
                    if (res.status === 200) {
                        openSnackBar({message: res.data.message, type: "success"})
                        props.history.push("/login");
                        return;
                    } else {
                        openSnackBar({message: "Authentication Error", type: "error"});
                    }
                })
                .catch(error => {
                    openSnackBar({message: error.response.data.message, type: "error"});
                });
        }
    }

    return (
        <Container maxWidth="sm" component="main" className={"MuiContainer--01"}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
                                Enrollment
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel htmlFor="username-input">Usuario</InputLabel>
                                <Input 
                                    id="username-input" 
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel htmlFor="secret-input">Secreto</InputLabel>
                                <Input 
                                    id="firstname-input" 
                                    value={secret}
                                    type="password"
                                    onChange={e => setSecret(e.target.value)}
                                    required/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel htmlFor="newpassword-input">Nueva Contraseña</InputLabel>
                                <Input 
                                    id="newpassword-input" 
                                    value={newPassword}
                                    type="password"
                                    onChange={e => setNewPassword(e.target.value)}
                                    required/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel htmlFor="newpassword-confirmation-input">Confirmación de la nueva contraseña</InputLabel>
                                <Input 
                                    id="newpassword-confirmation-input" 
                                    value={newPasswordConfirmation}
                                    type="password"
                                    onChange={e => setNewPasswordConfirmation(e.target.value)}
                                    required/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" className={"MuiButton-Full"} variant="contained" size="large" color="primary">
                                Enroll
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button className={"MuiButton-Full"} href="/login/" size="large" color="primary">
                                Volver al login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}