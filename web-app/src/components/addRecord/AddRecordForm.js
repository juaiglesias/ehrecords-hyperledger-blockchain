import axios from 'axios';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { FormControl, Input, InputLabel } from '@material-ui/core';

const styles = {
    formDiv: {
        margin: 10
    },
    textField: {
      marginLeft: 8,
      marginRight: 10,
      width: 300,
    }
}

export default function AddRecordForm(props) {
    const [information, setInformation] = useState('');

    const handleChange = (e) => {
        setInformation(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/records/', {
                key: props.patientId,
                information,
                doctorId: "asdasd"
            })
            .then(res => {
                /*setStatusSnackBar({message: "Patient added correctly", type: "success"});*/
                console.log("success");
            })
            .catch(error => {
               /* setStatusSnackBar({message: error.response.data.message, type: "error"});*/
               console.log("error");
            })
            .finally(() => {
                props.handleExit();
            });
    }

    return (
        <div style={styles.formDiv}>
            <form onSubmit={handleSubmit}>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="msg">Add New Record *</InputLabel>
                    <Input 
                        id="msg" 
                        value={information} 
                        onChange={handleChange} 
                        multiline 
                        rows={10} 
                        required 
                    />
                </FormControl>
                <Button type="submit" size="small" variant="outlined" color="primary">
                Submit
                </Button>
            </form>
        </div>
    );
}