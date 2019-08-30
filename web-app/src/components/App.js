import AboutUs from './aboutUs/AboutUs';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {createMuiTheme, CssBaseline} from '@material-ui/core';
import Footer from './footer/Footer';
import Home from './home/Home';
import MenuBar from './menuBar/MenuBar';
import Patients from './patients/Patients';
import React from 'react';
import { responsiveFontSizes } from '@material-ui/core/styles';
import SnackBar from './snackBar/SnackBar';
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
        <MenuBar/>
        <Switch>
          <Route path="/" exact component={Home} />
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
