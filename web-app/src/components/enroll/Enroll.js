import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles( theme => ({
    paper: {
        padding: theme.spacing(4),
    }
}));

export default function Login(props) {
    const [userName, setUsername] = useState('');
    const [secret, setSecret] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

    const classes = useStyles();

    const redirectToLogin = () => {
        props.history.push('/login/');
    }

    return (
        <Container maxWidth="sm" component="main" className={"MuiContainer--01"}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
                            Enrollement
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="username-input">Username</InputLabel>
                            <Input 
                                id="username-input" 
                                value={userName}
                                onChange={e => setUsername(e.target.value)}
                                required/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="secret-input">Secret</InputLabel>
                            <Input 
                                id="firstname-input" 
                                value={secret}
                                type="password"
                                onChange={e => setSecret(e.target.value)}
                                required/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="newpassword-input">New Password</InputLabel>
                            <Input 
                                id="newpassword-input" 
                                value={newPassword}
                                type="password"
                                onChange={e => setNewPassword(e.target.value)}
                                required/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="newpassword-confirmation-input">New Password Confirmation</InputLabel>
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
                        <Button type="submit" className={"MuiButton-Full"} onClick={redirectToLogin} size="large" color="primary">
                            Return to login
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}