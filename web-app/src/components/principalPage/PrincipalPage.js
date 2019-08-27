import AddPatientForm from '../addPatient/AddPatientForm';
import axios from 'axios';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PatientList from '../patientList/PatientList';
import React from 'react';
import SearchBoxPatients from '../searchBoxPatients/SearchBoxPatients';
import Typography from '@material-ui/core/Typography';

const styles = {
    heroContent: {
        padding: '64px 0px 48px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButon: {
        
        width: '100%',
        minWidth: 275,
    },
    block: {
        margin: '10px',
    },
};

export default class PrincipalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { patients: [], filter: '', addingPatient: false };
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.toogleAddingPatientStatus = this.toogleAddingPatientStatus.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/patients/')
            .then(
                (result) => {
                    this.setState({ patients: result.data.patients, filter: this.state.filter, addingPatient: this.state.addingPatient });
                }
            )
    }

    handleFilterChange(newValue) {
        this.setState({filter: newValue});
    }

    toogleAddingPatientStatus() {
        this.setState({patients: this.state.patients, filter: this.state.filter, addingPatient: !this.state.addingPatient});
    }


    render() {
        const patients =  this.state.patients;
        const filter = this.state.filter;
        let addingPatient;

        if (this.state.addingPatient){
            addingPatient = <AddPatientForm cancel={this.toogleAddingPatientStatus}/>
        } else {
            addingPatient = <div style={styles.block}>
                                <Button style={styles.addButon} onClick={this.toogleAddingPatientStatus}>
                                    Add patient
                                </Button>
                            </div>
        }
        return (
            <Container maxWidth="sm" component="main" style={styles.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Patients
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    List of Patients
                </Typography>
                <SearchBoxPatients inputValue={filter} onFilterChange={this.handleFilterChange}/>
                {addingPatient}
                <PatientList patients={patients} filter={filter}/>
            </Container>
        );

    }
}