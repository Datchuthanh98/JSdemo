import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addItemtoNode} from '../actions'

class Add extends Component {
  constructor(props){
    super(props);
    this.state={
      topic:"",
      detail:""
    }
  }


  isChange =(event)=>{
    const {name, value} = event.target
    this.setState({
     [name]:value
    },()=>{console.log(this.state)})
    }

    AddItem=()=>{
    let newItem={};
    newItem.topic=this.state.topic;
    newItem.detail=this.state.detail
    this.props.AddOK(newItem);
    }

  render(){
        return (           
      <div>
         <div className="col">      
           <div className="card border-primary mb-3 mt-2">
    <div className="card-header" align="center">Thêm ghi chú </div>
    <div className="card-body text-primary">
    <form>
      <div className="form-group">
        <input onChange={(event)=>{this.isChange(event)}} 
         value={this.state.topic}
        name="topic" type="text" className="form-control"  placeholder="Tên ghi chú" /></div>
      <div className="form-group">
        <textarea onChange={(event)=>{this.isChange(event)}} 
        value={this.state.detail}
        name="detail" className="form-control"  placeholder="Chi tiết" /></div>
      <div className="form-group">
        <input type="button"  
         onClick={()=>this.AddItem()}   
        className="btn btn-block btn-primary" 
         value="Thêm mới" />
      </div>
      </form>  
    </div>
  </div> 
  </div>         
     </div>          
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: state.listItems.length + 1
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    AddOK: (newItem) => {dispatch(addItemtoNode(newItem))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);