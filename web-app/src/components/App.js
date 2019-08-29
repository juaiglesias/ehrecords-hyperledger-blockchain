import React from 'react';
import MenuBar from './menuBar/MenuBar';
import Home from './home/Home';
import PrincipalPage from './principalPage/PrincipalPage';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import Footer from './footer/Footer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SnackBar from './snackBar/SnackBar';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <div className="App">
          <MenuBar/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/patients" component={PrincipalPage} />
          </Switch>
          <SnackBar />
          <Footer/>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
