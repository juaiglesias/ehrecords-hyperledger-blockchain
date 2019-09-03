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

export default function Login() {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    return (
        <Container maxWidth="sm" component="main" className={"MuiContainer--01"}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
                            Welcome to EHRecords
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="username-input">Username</InputLabel>
                            <Input 
                                id="username-input" 
                                value={userName}
                                onChange={e => setUsername(e.target.value)}
                                required/>
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
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
                    <Grid item sm={12}>
                        <Button type="submit" className={"MuiButton-Full"} variant="contained" size="large" color="primary">
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}