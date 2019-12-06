import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../Components/Home';
import New from '../Components/New';
import Allnew from '../Components/Allnew';
import Register from '../Components/Register';

export default class DirectURL extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/Allnew" exact  component={Allnew} />
        <Route path="/AllNew/:id"  component={New} />
        <Route path="/Register/"  component={Register} />
      </div>
    )
  }
}
