import axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/styles';
import { openSnackBar } from '../snackBar/SnackBar';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles( theme => ({
    card: {
          minWidth: 275,
          margin: theme.spacing(1),
          padding: theme.spacing(1),
    },
}));

export default function AddPatientForm(props) {
    const [dni,setDni] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const cancel = props.cancel;
    const addPatient = props.addPatient;

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/api/patients/`, {
                key: dni,
                firstName,
                lastName,
                age,
                address
            },
            {
                'headers': { 
                    'x-access-token': localStorage.getItem('jwtToken') 
                } 
            })
            .then(res => {
                openSnackBar({message: "Patient added correctly", type: "success"});
                addPatient(res.data.newPatient);
            })
            .catch(error => {
                openSnackBar({message: error.response.data.message, type: "error"});
            })
    }

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <Typography variant="h6" component="h2">
                            New Patient
                        </Typography>
                        <Box m={1}>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="dni-input">DNI *</InputLabel>
                                        <Input 
                                            id="dni-input" 
                                            value={dni}
                                            onChange={e => setDni(e.target.value)}
                                            required/>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="firstname-input">First Name *</InputLabel>
                                        <Input 
                                            id="firstname-input" 
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                            required/>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="lastname-input">Last Name *</InputLabel>
                                        <Input 
                                            id="lastname-input" 
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                            required/>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth> 
                                        <InputLabel htmlFor="address-input">Address *</InputLabel>
                                        <Input 
                                            id="address-input" 
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                            required/>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="age-input">Age *</InputLabel>
                                        <Input 
                                            id="age-input" 
                                            type="number" 
                                            value={age}
                                            onChange={e => setAge(e.target.value)}
                                            required
                                            inputProps={{min: 0,}} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box className={"MuiBox-RightAlign"}>
                            <Button color="secondary" onClick={cancel}>
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" /*onSubmit={() => { if (window.confirm('Are you sure?')) submit}*/ >
                                Save
                            </Button>
                        </Box>
                    </CardActions>
                </form>
            </Card>
        </React.Fragment>
    );
}