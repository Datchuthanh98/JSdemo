import React, { Component } from 'react';

class Add extends Component {
  constructor(props){
    super(props);
    this.state={
      id:"",
      topic:"",
      detail:"",
    }
  }  


   isChange =(event)=>{
     const name = event.target.name;
     const value = event.target.value;
     this.setState({
      [name]:value
     })
     var item={};
     item.id=this.state.id;
     item.topic=this.state.topic;
     item.detail=this.state.detail; 
     console.log(item);
     
   }

  kiemtratrangthai=()=>{
    if(this.props.hienthiformadd===true)
      return(
        <div className="col">
           
             <div className="card border-primary mb-3 mt-2">
      <div className="card-header" align="center">Thêm ghi chú </div>
      <div className="card-body text-primary">
      <form>
        <div className="form-group">
          <input onChange={(event)=>{this.isChange(event)}}  name="topic" type="text" className="form-control"  placeholder="Tên ghi chú" /></div>
        <div className="form-group">
          <textarea onChange={(event)=>{this.isChange(event)}} name="detail" className="form-control"  placeholder="Chi tiết" /></div>
        <div className="form-group">
          <input type="reset" className="btn btn-block btn-primary" onClick={()=>this.props.add(this.state.topic,this.state.detail)} value="Thêm mới" />
        </div>
        </form>  
      </div>
    </div> 
 
    </div>      
      )    
  }
  
  render() {
    
        return (           
      <div>
        {this.kiemtratrangthai()}   
     </div>          
        );
    }
}

export default Add;