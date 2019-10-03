import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: '1px',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function NavBar(props) {
  const classes = useStyles();

  const handleLogout = () => {
    props.setLogout();
    props.history.push('/');
  }

  return (
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>
            Hospital1
          </Typography>
          <nav>
            { props.loggedIn ?
              (
                <Link variant="button" color="textPrimary" href="/patients" className={classes.link}>
                  Pacientes
                </Link>
              ) :
              (
                <Link variant="button" color="textPrimary" href="/" className={classes.link}>
                  EHRecords
                </Link>
              )
            }
            <Link variant="button" color="textPrimary" href="/aboutus" className={classes.link}>
              About Us
            </Link>
          </nav>

          { props.loggedIn ?
              (
                <Button color="primary" variant="outlined" onClick={handleLogout} className={classes.link}>
                  Logout
                </Button>
              ) :
              (
                <Button href="/login/" color="primary" variant="outlined" className={classes.link}>
                  Login
                </Button>
              )
          }
        </Toolbar>
      </AppBar>
  );
}
export default withRouter(NavBar);