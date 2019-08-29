import axios from 'axios';
import Button from '@material-ui/core/Button';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import { openSnackBar } from '../snackBar/SnackBar';
import React, { useState } from 'react';

const styles = {
    formDiv: {
        marginLeft: 10,
        marginRight: 10,
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
                openSnackBar({message: "Record added correctly", type: "success"});
            })
            .catch(error => {
                openSnackBar({message: error.response.data.message, type: "error"});
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