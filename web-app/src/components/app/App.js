import AboutUs from '../aboutUs/AboutUs';
import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';
import {createMuiTheme, CssBaseline} from '@material-ui/core';
import Enroll from '../enroll/Enroll';
import Footer from '../footer/Footer';
import Home from '../home/Home';
import NavBar from '../navBar/NavBar';
import Login from '../login/Login';
import Patients from '../patients/Patients';
import React, { useState } from 'react';
import { responsiveFontSizes } from '@material-ui/core/styles';
import SnackBar from '../snackBar/SnackBar';
import { ThemeProvider } from '@material-ui/styles';
import { red, green } from '@material-ui/core/colors';
import WithAuth from '../auth/WithAuth';

import './App.css';

let theme = createMuiTheme({
  palette: {
    background: {
      default: "#f1f1f1"
    },
    success: {
      main: green[600],
    },
    error: {
      main: red[600],
    }
  },
  overrides: {
    MuiContainer: {
      root: {
        "&.MuiContainer--01": {
          padding: "64px 0px",
          justifyContent: 'center',
          alignItems: 'center',
        }
      }
    },
    MuiButton: {
      root: {
        "&.MuiButton-Full": {
          width: '100%',
          minWidth: 275,
        }
      }
    },
    MuiBox: {
      root: {
        "&.MuiBox-RightAlign": {
          display: 'inline-block',
          marginLeft: 'auto',
        },
        "&.MuiBox-CenterAlign": {
          display: 'inline-block',
          alignItems: 'center',
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme);

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwtToken'));

  const login = (token) => {
    localStorage.setItem('jwtToken', token);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar loggedIn= {loggedIn} setLogout={logout} />
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/login" render={ (props) => (
            loggedIn ? (
              <Redirect to="/patients" />
            ) : (
            <Login {...props} setLogin={login} />
            )
          ) } />
          <Route path="/enroll" render={ (props) => (
            loggedIn ? (
              <Redirect to="/patients" />
            ) : (
              <Enroll/>
            )
          ) } />
          <Route path="/patients" render={ props => <WithAuth Component={Patients} {...props} />} />
          <Route path="/aboutus" component={ AboutUs } />
        </Switch>
        <SnackBar />
        <Footer/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
