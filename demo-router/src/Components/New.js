import React, { Component } from 'react'
import Data from './Data.json'

export default class New extends Component {
  render() {
    let result=Data.find(item=>item.id==this.props.match.params.id);
    console.log(result);
    return (
      <div className="container">
      <div className="card">
        <div className="card-body">
          <img src={result.image} className="img-fluid" />
          <blockquote className="blockquote">
            <footer className="card-blockquote">{result.topic}</footer>
            <p>{result.detail}</p>
          </blockquote>
        </div>
      </div>
    </div>
    
    )
  }
}
