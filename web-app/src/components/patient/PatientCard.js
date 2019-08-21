import React from 'react';
import PatientSummaryCard from './PatientSummaryCard';
import PatientExpandedCard from './PatientExpandedCard';

export default class PatientCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isExpanded: false};
        this.expand = this.expand.bind(this);
        this.shrink = this.shrink.bind(this)
    }

    expand() {
        this.setState({isExpanded: true});
    }

    shrink() {
        this.setState({isExpanded: false});
    }

    render() {
        const patient = this.props.value;

        if (this.state.isExpanded)
            return (<PatientExpandedCard buttonClick={this.shrink} value={patient} />);
        return (<PatientSummaryCard buttonClick={this.expand} value={patient} />);
    }
}