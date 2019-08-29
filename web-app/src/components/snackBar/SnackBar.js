import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import { red, green } from '@material-ui/core/colors';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const styles = {
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[600],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: 8,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
};

let openSnackBarFn;

export default class SnackBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      message: '',
      type: '',
    };
  }

  componentDidMount() {
    openSnackBarFn = this.openSnackBar;
  }

  openSnackBar = ({ message, type }) => {
    this.setState({
      open: true,
      message,
      type,
    });
  };
  
  handleSnackBarClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const type = this.state.type;
    let Icon = null;
    let style = null;

    //BY default show error
    if (variantIcon[type]) Icon = variantIcon[type]
      else Icon = variantIcon["error"];

    if (styles[type]) style = styles[type]
      else style = styles["error"];

    return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleSnackBarClose}
        >
          <SnackbarContent
            style={style}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" style={styles.message}>
                <Icon style={styles.icon} />
                {this.state.message}
              </span>
            }
            action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleSnackBarClose}>
                <CloseIcon/>
              </IconButton>,
            ]}
          />
        </Snackbar>
    );
  }
 
}

export function openSnackBar({message, type}) {
  openSnackBarFn({message, type});
}