import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/styles';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const styles = (theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
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
});

let openSnackBarFn;

class SnackBar extends React.Component {
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
    let classSnackBar = null;
    const {classes} = this.props;

    //BY default show error
    if (variantIcon[type]) Icon = variantIcon[type]
      else Icon = variantIcon["error"];

    if (classes[type]) classSnackBar = classes[type]
      else classSnackBar = classes["error"];

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
            className={classSnackBar}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <Icon className={classes.icon} />
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
export default withStyles(styles, { withTheme: true })(SnackBar);

export function openSnackBar({message, type}) {
  openSnackBarFn({message, type});
}