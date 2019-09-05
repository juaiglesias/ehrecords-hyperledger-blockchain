import AboutUs from '../aboutUs/AboutUs';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {createMuiTheme, CssBaseline} from '@material-ui/core';
import Enroll from '../enroll/Enroll';
import Footer from '../footer/Footer';
import Home from '../home/Home';
import NavBar from '../navBar/NavBar';
import Login from '../login/Login';
import Patients from '../patients/Patients';
import React from 'react';
import { responsiveFontSizes } from '@material-ui/core/styles';
import SnackBar from '../snackBar/SnackBar';
import { ThemeProvider } from '@material-ui/styles';
import { red, green } from '@material-ui/core/colors';

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/enroll" component={Enroll} />
          <Route path="/patients" component={Patients} />
          <Route path="/aboutus" component={AboutUs} />
        </Switch>
        <SnackBar />
        <Footer/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
