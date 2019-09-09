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

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/api/user/login/`, {
                username,
                password
            })
            .then(res => {
                if (res.status === 200) {
                    const token = res.data.token;
                    props.setLogin(token);
                    props.history.push("/patients");
                    return;
                } else {
                    openSnackBar({message: "Authentication Error", type: "error"});
                }
            })
            .catch(error => {
                openSnackBar({message: error.response.data.message, type: "error"});
            });

    }

    return (
        <Container maxWidth="sm" component="main" className={"MuiContainer--01"}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
                                Welcome to EHRecords
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="username-input">Username</InputLabel>
                                <Input 
                                    id="username-input" 
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="password-input">Password</InputLabel>
                                <Input 
                                    id="firstname-input" 
                                    value={password}
                                    type="password"
                                    onChange={e => setPassword(e.target.value)}
                                    required/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" className={"MuiButton-Full"} variant="contained" size="large" color="primary">
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button className={"MuiButton-Full"} href="/enroll/" size="large" color="primary">
                                Not registered? Enroll now!
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}