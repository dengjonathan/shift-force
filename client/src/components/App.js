import React, {Component} from 'react';
import NavBar from './NavBar';
import logo from './logo.svg';
import './App.css';

export default({children}) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h2>ShiftFORCE</h2>
    </div>
    <NavBar/> 
    {children}
  </div>
);
