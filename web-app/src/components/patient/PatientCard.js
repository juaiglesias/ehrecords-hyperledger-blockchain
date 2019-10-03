import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PatientExpandedInfo from './PatientExpandedInfo';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    card: {
      minWidth: 275,
      margin: theme.spacing(1),
    },
});

class PatientCard extends React.Component {
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
      const {classes} = this.props;

      return (
          <Card className={classes.card}>
            <CardContent>
              <Box mb={1}>
                <Typography color="textSecondary" gutterBottom>
                  DNI {this.props.Key}
                </Typography>
                <Typography variant="h5" component="h2">
                  {this.props.Value.firstName} {this.props.Value.lastName}
                </Typography>
                <Typography color="textSecondary">
                  Edad: {this.props.Value.age}
                </Typography>
                <Typography color="textSecondary">
                  Dirección: {this.props.Value.address}
                </Typography>
              </Box>
              {
                  this.state.isExpanded ?
                      (<PatientExpandedInfo id={this.props.Key} onExit={this.shrink}/>)
                      : (null)
              }
            </CardContent>
            <CardActions>
              {
                  this.state.isExpanded ? 
                      (<Button size="small" onClick={this.shrink}>Ver menos</Button>)
                      : (<Button size="small" onClick={this.expand}>Ver más</Button>)
              }
            </CardActions>
          </Card>
      );
    }
}
export default withStyles(styles, { withTheme: true })(PatientCard);