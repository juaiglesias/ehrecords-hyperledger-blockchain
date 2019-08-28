import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import SnackBar from '../snackBar/SnackBar';


import axios from 'axios';
import useSnackBar from '../snackBar/useSnackBar';

const styles = {
    card: {
      minWidth: 275,
      margin: '10px',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    rightButtons: {
        display: 'inline-block',
        marginLeft: 'auto',
    },
};

export default function AddPatientForm(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const cancel = props.cancel;

    const {statusSnackBar, setStatusSnackBar, closeSnackBar} = useSnackBar();


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/patients/', {
                key: "ABsd2",
                firstName,
                lastName,
                age,
                address
            })
            .then(res => {
                setStatusSnackBar({message: "Patient added correctly", type: "success"});
            })
            .catch(error => {
                setStatusSnackBar({message: error.response.data.message, type: "error"});
            })
    }

    const inputProps = {
        min: 0,
    };

    return (
        <React.Fragment>
            <Card style={styles.card}>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <Typography variant="h6" component="h2">
                            New Patient
                        </Typography>
                            <Grid container>
                                <Grid item sm={6} xs={12}>
                                    <FormControl>
                                        <InputLabel htmlFor="firstname-input">First Name *</InputLabel>
                                        <Input 
                                            id="firstname-input" 
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                            required/>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl>
                                        <InputLabel htmlFor="lastname-input">Last Name *</InputLabel>
                                        <Input 
                                            id="lastname-input" 
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                            required/>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl>
                                        <InputLabel htmlFor="address-input">Address *</InputLabel>
                                        <Input 
                                            id="address-input" 
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                            required/>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl>
                                        <InputLabel htmlFor="age-input">Age *</InputLabel>
                                        <Input 
                                            id="age-input" 
                                            type="number" 
                                            value={age}
                                            onChange={e => setAge(e.target.value)}
                                            required
                                            inputProps={inputProps}/*value={name} onChange={handleChange}*/ />
                                    </FormControl>
                                </Grid>
                            </Grid>
                    </CardContent>
                    <CardActions>
                        <div style={styles.rightButtons}>
                            <Button color="secondary" onClick={cancel}>
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" /*onSubmit={() => { if (window.confirm('Are you sure?')) submit}*/ >
                                Save
                            </Button>
                        </div>
                    </CardActions>
                </form>
            </Card>
            {statusSnackBar ? <SnackBar msg={statusSnackBar.message} type={statusSnackBar.type} close={closeSnackBar} /> : null}
        </React.Fragment>
    );
}