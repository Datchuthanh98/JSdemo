import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Nav from './Components/Nav';
import Header from './Components/Header';
import Footer from './Components/Footer';
import DirectURL from './Router/DirectURL';


function App() {
  return (
    <Router>
    <Nav></Nav> 
    <DirectURL></DirectURL>
    <Header></Header>
    <Footer></Footer>
    </Router>
  );
}

export default App;
