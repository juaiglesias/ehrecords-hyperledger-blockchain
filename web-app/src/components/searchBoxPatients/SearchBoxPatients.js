import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
    root: {
      margin: '10px',
      padding: '4px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
};

export default class SearchBoxPatients extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {filter: ''};
    }

    handleChange(e) {
        this.props.onFilterChange(e.target.value);
    }

    render() {
        const filter = this.props.inputValue;

        return (
            <Paper style={styles.root}>
                <InputBase
                    style={styles.input}
                    placeholder="Filter Patients"
                    value={filter}
                    inputProps={{ 'aria-label': 'filter patients' }}
                    onChange={this.handleChange}
                />
                <IconButton style={styles.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        );
    }
}