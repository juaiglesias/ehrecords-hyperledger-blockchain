import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

export default class PatientExpandedCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.buttonClick();
    }

    render() {
        return (
            <Card style={styles.card}>
              <CardContent>
                <Typography style={styles.title} color="textSecondary" gutterBottom>
                  Acá iría algo EXPANDIDO JOJO
                </Typography>
                <Typography variant="h5" component="h2">
                  {this.props.value.firstName} {this.props.value.lastName}
                </Typography>
                <Typography style={styles.pos} color="textSecondary">
                  adjective
                </Typography>
                <Typography variant="body2" component="p">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={this.handleClick}>View Less</Button>
              </CardActions>
            </Card>
        );
    }
}