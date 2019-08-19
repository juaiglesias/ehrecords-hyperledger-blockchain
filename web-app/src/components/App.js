import React from 'react';
import MenuAppBar from './appMenuBar/AppMenuBar';
import AppFooter from './appFooter/AppFooter';
import AppBody from './appBody/AppBody';
import './App.css';

function App() {
  return (
    <div className="App">
      <MenuAppBar/>
      <AppBody />
      <AppFooter/>
    </div>
  );
}

export default App;
