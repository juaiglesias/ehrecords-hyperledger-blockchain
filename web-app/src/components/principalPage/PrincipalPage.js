import React from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PatientList from '../patientList/PatientList';
import SearchBoxPatients from '../searchBoxPatients/SearchBoxPatients';

import Button from '@material-ui/core/Button';

import AddPatientForm from '../addPatient/AddPatientForm';

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
        this.state = {filter: '', addingPatient: false};
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.toogleAddingPatientStatus = this.toogleAddingPatientStatus.bind(this);
    }

    handleFilterChange(newValue) {
        this.setState({filter: newValue});
    }

    toogleAddingPatientStatus() {
        this.setState({filter: this.state.filter, addingPatient: !this.state.addingPatient});
    }

    render() {
        const pacientes = [
            {'id': 'C', 'firstName': 'El pity Martinez, que loco que está', 'lastName': 'asda', 'address': 'la vie lalala',
                'records': [{'information': 'asdasdsa', 'date': '12/27/20', 'doctorId': 's12323'}, 
                {'information': 'asdasdsa', 'date': '12/27/20', 'doctorId': 's12323'},
                {'information': 'asdasdsa', 'date': '12/27/20', 'doctorId': 's12323'}]},
            {'id': 'A', 'firstName': 'Pepe', 'lastName': 'asdas', 'address': 'la vidde lalala', 'records': []},
            {'id': 'B', 'firstName': 'PedfWWe', 'lastName': 'asdas', 'address': 'ladssfd vie lalala', 'records': []}
        ];

        const filter = this.state.filter;
        var addingPatient;

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
                <PatientList patients={pacientes} filter={filter}/>
            </Container>
        );

    }
}