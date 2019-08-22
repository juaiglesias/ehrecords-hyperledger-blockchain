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
import FormHelperText from '@material-ui/core/FormHelperText';

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
    /*const [firstName, setFirstName] = useState('');*/
    const cancel = props.cancel;

    return (
        <Card style={styles.card}>
            <CardContent>
                <Typography variant="h6" component="h2">
                    New Patient
                </Typography>
                <form>
                    <Grid container>
                        <Grid item sm={6} xs={12}>
                            <FormControl>
                                <InputLabel htmlFor="component-simple">First Name</InputLabel>
                                <Input id="component-simple" /*value={name} onChange={handleChange}*/ />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <FormControl>
                                <InputLabel htmlFor="component-simple">Last Name</InputLabel>
                                <Input id="component-simple" /*value={name} onChange={handleChange}*/ />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <FormControl>
                                <InputLabel htmlFor="component-simple">Address</InputLabel>
                                <Input id="component-simple" /*value={name} onChange={handleChange}*/ />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <FormControl>
                                <InputLabel htmlFor="component-simple">Age</InputLabel>
                                <Input id="component-simple" /*value={name} onChange={handleChange}*/ />
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
            <CardActions>
                <div style={styles.rightButtons}>
                <Button color="secondary" onClick={cancel}>
                    Cancel
                </Button>
                <Button color="primary">
                    Save
                </Button>
                </div>
            </CardActions>
        </Card>
    );
}