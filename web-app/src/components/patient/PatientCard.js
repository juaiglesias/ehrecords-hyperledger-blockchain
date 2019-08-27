import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PatientExpandedInfo from './PatientExpandedInfo';
import React from 'react';
import Typography from '@material-ui/core/Typography';

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
};

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
        return (
            <Card style={styles.card}>
              <CardContent>
                <Typography style={styles.title} color="textSecondary" gutterBottom>
                  DNI {this.props.Key}
                </Typography>
                <Typography variant="h5" component="h2">
                  {this.props.Value.firstName} {this.props.Value.lastName}
                </Typography>
                <Typography color="textSecondary">
                  Age: {this.props.Value.age}
                </Typography>
                <Typography style={styles.pos}  color="textSecondary">
                  Address: {this.props.Value.address}
                </Typography>
                {
                    this.state.isExpanded ?
                        (<PatientExpandedInfo />)
                        : (null)
                }
              </CardContent>
              <CardActions>
                {
                    this.state.isExpanded ? 
                        (<Button size="small" onClick={this.shrink}>View Less</Button>)
                        : (<Button size="small" onClick={this.expand}>View More</Button>)
                }
              </CardActions>
            </Card>
        );
    }
}