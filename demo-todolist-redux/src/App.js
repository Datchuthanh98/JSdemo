import React, { Component } from 'react'
import './App.css';
import TableData from './Components/TableData';
import { connect } from 'react-redux';
import Add from './Components/Add';
import Edit from './Components/Edit';
import {actGetAllTodos} from './actions'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
    } 
  }

  componentDidMount() {
    // action
    this.props.actGetAllTodoss()
  }
  
  
  ShowEdit=()=>{
  if(this.props.hienthiformedit){
   return <Edit></Edit>
    }
  }
    
  ShowAdd=()=>{
    if(this.props.hienthiformadd){
     return <Add></Add>
      }
    }

  render() {
    return (
      <div>
      <div className="container">
      <div className="row">
        <TableData></TableData>
        <div className="col-3">
            <div align="center">
            <button type="button" class="btn btn-primary" onClick={()=>this.props.isAdd()}>Thêm</button>
        </div>
        {this.ShowEdit()}
        {this.ShowAdd()}
       
        </div>
         </div> 
         </div>  
         </div>    
    );
  }}


const mapStateToProps = (state, ownProps) => {
  return {
    hienthiformedit:state.hienthiformedit,
    hienthiformadd:state.hienthiformadd
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    isAdd: () => {
      dispatch({type:"GET_ADD"})
    },
    actGetAllTodoss:() => dispatch(actGetAllTodos())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
