import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function PatientExpandedInfo() {
    return (
      <React.Fragment>
        <Typography variant="h6">
          Registers
        </Typography>
        <List>
            <ListItem>
              <ListItemText
                primary="Single-line item"
                secondary="Secondary text"
              />
            </ListItem>
        </List>
      </React.Fragment>
    );
}