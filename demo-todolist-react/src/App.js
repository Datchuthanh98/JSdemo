import React, { Component } from 'react'
import './App.css';
import TableData from './Components/TableData';
import Add from './Components/Add';
import Data from './Components/Data.json';
import Edit from './Components/Edit';

const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      hienthiformadd:false,
      data:Data,
      hienthiformedit:false,
      EditObject:{}
    }
  }
  
  editItem=(item)=>{
    this.setState({
      EditObject:item
    },()=>{
      console.log(this.setState.EditObject+"ahihi")
    })
    }

    
  deleteItem=(idItem)=>{
    var tempData=this.state.data.filter(item=>item.id!=idItem);
    this.setState({
      data:tempData
    })
  }

  getItemEditInfoApp=(info)=>{
    this.setState({
          data: this.state.data.map(_todo => {
            if(_todo.id === info.id) {
             _todo=info;
            }
            return _todo
          })
    })

  }  

  getNew = (topic,detail)=>{
    var item={};
    item.id=uuidv1();
    item.topic=topic;
    item.detail=detail;
    var items=this.state.data;
    items.push(item);
    this.setState({
      data:items
    })
    console.log(items);   
  }
  
  doitrangthai=()=>{
    this.setState({
    hienthiformadd:!this.state.hienthiformadd
    });
    }
   
    hienthiformedit=()=>{
      this.setState({
       hienthiformedit:!this.state.hienthiformedit
      })
    } 

  render() {
    var ketqua=[];
    this.state.data.forEach((item)=>{    
        ketqua.push(item);
    })
    
    
    return (
      <div>
        <div className="container">
        <div className="row">
        <TableData 
        deleteItem={(id)=>{this.deleteItem(id)}}
        editFun={(item)=>{this.editItem(item)}} 
        dataItemPops={ketqua}
        hienthiformedit={()=>this.hienthiformedit()}
        ></TableData>
        
        <div className="col-3">
            <div align="center">
            <button type="button" class="btn btn-primary" onClick={()=>this.doitrangthai()}  >Thêm</button>
        </div>

         <Add add={(topic,detail)=>this.getNew(topic,detail)}
          hienthiformadd={this.state.hienthiformadd}></Add>
          <Edit hienthiformedit={this.state.hienthiformedit}
           EditObject={this.state.EditObject}
           getItemEditInfoApp={(info)=>this.getItemEditInfoApp(info)}
           ></Edit>     
          </div>
         </div>
         </div>
         </div>
    );
  }
}

export default App;
