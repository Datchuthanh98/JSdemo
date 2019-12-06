import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link,NavLink } from "react-router-dom";

export default class Item extends Component {
  render() {
    return (
        <div className="col-4">
        <div className="card">
          <div className="card-body">
          <Link to={"/AllNew/"+this.props.id} >
            <img src={this.props.image} className="img-fluid"/></Link>
            <blockquote className="blockquote">
              <footer className="card-blockquote">{this.props.topic}</footer>
              <p>{this.props.detail}</p>
            </blockquote>
          </div>
        </div>
      </div>
    )
  }
}
