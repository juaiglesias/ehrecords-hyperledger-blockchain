import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import { red, green } from '@material-ui/core/colors';

export default function SnackBar({msg, type, close}) {

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

    const style = (type==="success") ? styles.success : styles.error;
    const Icon = variantIcon[type];
    return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={true}
          autoHideDuration={6000}
          onClose={close}
        >
          <SnackbarContent
            style={style}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" style={styles.message}>
                <Icon style={styles.icon} />
                {msg}
              </span>
            }
            action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={close}>
                <CloseIcon/>
              </IconButton>,
            ]}
          />
        </Snackbar>
    );
}