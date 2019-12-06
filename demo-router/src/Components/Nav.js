import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link,NavLink } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div className="container">
        <NavLink className="nav-link js-scroll-trigger" to="/">Home</NavLink>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">      
          <ul className="navbar-nav ml-auto">
            <li className="nav-item" >
              <NavLink className="nav-link js-scroll-trigger" to="/Allnew/">Allnew</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link js-scroll-trigger" to="/New/">New</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link js-scroll-trigger" to="/Register/">Register</NavLink>
            </li>
          </ul>
          </div>
        </div>
      </nav>      
    )
  }
}
