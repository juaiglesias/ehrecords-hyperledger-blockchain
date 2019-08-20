import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
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
});

export default function SearchBoxPatients() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
        <InputBase
            className={classes.input}
            placeholder="Filter Patients"
            inputProps={{ 'aria-label': 'filter patients' }}
            />
        <IconButton className={classes.iconButton} aria-label="search">
            <SearchIcon />
        </IconButton>
    </Paper>
  );
}