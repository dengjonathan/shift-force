import React, {Component} from 'react';
import NavBar from './NavBar';
import logo from './logo.svg';
import './App.css';

export default({children}) => (
  <div className="App">
    <NavBar/> 
    {children}
  </div>
);
