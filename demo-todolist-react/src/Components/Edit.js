import React, { Component } from 'react';

class Edit extends Component {
  constructor(props){
    super(props);
    this.state={}
  }  

  

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.EditObject.id !== prevState.id){
      return nextProps.EditObject
    }
  }
  

   isChange =(event)=>{
     const {name, value} = event.target
     this.setState({
      [name]:value
     })
  }
 
   SaveEdit=()=>{
    let info={};
    info.id=this.state.id;
    info.topic=this.state.topic;
    info.detail=this.state.detail; 
    // console.log(info);
    this.props.getItemEditInfoApp(info);
    // this.props.hienthiformedit();
   }

  kiemtratrangthai=()=>{
    if(this.props.hienthiformedit)
      return(
        <div className="col">        
             <div className="card border-primary mb-3 mt-2">
      <div className="card-header" align="center">Sửa ghi chú </div>
      <div className="card-body text-primary">
      <form>
        <div className="form-group">
          <input onChange={(event)=>{this.isChange(event)}}  name="topic" type="text" className="form-control"  placeholder="Tên ghi chú"  value={this.state.topic}/></div>
        <div className="form-group">
        <textarea onChange={(event)=>{this.isChange(event)}} name="detail" type="text" className="form-control"  placeholder="Chi tiết"  value={this.state.detail}/></div>
        <div className="form-group">
          <input type="button" className="btn btn-block btn-primary" onClick={()=>this.SaveEdit()} value="Sửa" />
        </div>
        </form>  
      </div>
    </div> 
 
    </div>      
      )    
  }
  
  render() {
    console.log(this.props)
    
        return (           
      <div>
        {this.kiemtratrangthai()}   
     </div>          
        );
    }
}

export default Edit;