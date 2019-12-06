import React, { Component } from 'react'
import Item from './Item';
import data from './Data.json';


export default class Allnew extends Component {
  render() {
    return (
        <div className="container">
        <div className="row">
  
        {data.map((item)=>(
          <Item id={item.id}
                topic={item.topic}
                detail={item.detail}
                image={item.image}
          ></Item>
        )
        )}


        </div>
      </div>
      
    )
  }
}
