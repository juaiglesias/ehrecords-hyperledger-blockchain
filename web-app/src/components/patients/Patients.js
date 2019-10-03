import AddPatientForm from '../addPatient/AddPatientForm';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PatientList from '../patientList/PatientList';
import React from 'react';
import SearchBoxPatients from '../searchBoxPatients/SearchBoxPatients';
import { openSnackBar } from '../snackBar/SnackBar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles'; 

const styles = (theme) => ({
    box: {
        margin: theme.spacing(1),
    }
});

class Patients extends React.Component {
    constructor(props) {
        super(props);
        this.state = { patients: [], filter: '', addingPatient: false };
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.toogleAddingPatientStatus = this.toogleAddingPatientStatus.bind(this);
        this.addPatient = this.addPatient.bind(this);
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/patients/`, {
            'headers': { 
                'x-access-token': localStorage.getItem('jwtToken') 
            } 
        })
        .then(
            (result) => {
                this.setState({ patients: result.data.patients, filter: this.state.filter, addingPatient: this.state.addingPatient });
            },
            (error) => {
                openSnackBar({message: error.response.data.message, type: "error"});
            }
        )
    }

    handleFilterChange(newValue) {
        this.setState({filter: newValue});
    }

    toogleAddingPatientStatus() {
        this.setState({addingPatient: !this.state.addingPatient});
    }

    addPatient(newPatient) {
        let newPatientsList = this.state.patients;
        newPatientsList.unshift(newPatient);
        this.setState({ patients: newPatientsList }, this.toogleAddingPatientStatus);
    }


    render() {
        const { classes } = this.props;
        const patients =  this.state.patients;
        const filter = this.state.filter;
        let addingPatient;

        if (this.state.addingPatient){
            addingPatient = <AddPatientForm addPatient={this.addPatient} cancel={this.toogleAddingPatientStatus}/>
        } else {
            addingPatient = <Box className={classes.box}>
                                <Button className={"MuiButton-Full"} onClick={this.toogleAddingPatientStatus}>
                                    Agregar Paciente
                                </Button>
                            </Box>
        }
        return (
            <Container maxWidth="sm" component="main" className={"MuiContainer--01"}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Pacientes
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    Lista de Pacientes
                </Typography>
                <SearchBoxPatients inputValue={filter} onFilterChange={this.handleFilterChange}/>
                {addingPatient}
                <PatientList patients={patients} filter={filter}/>
            </Container>
        );

    }
}
export default withStyles(styles, { withTheme: true })(Patients);