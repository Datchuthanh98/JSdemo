import React, { Component } from 'react';

class TableDataRaw extends Component {
   
    editClick=()=>{
        this.props.editFunClick();
        this.props.hienthiformedit()
    }

    deleteButtonClick=(id)=>{
        this.props.deleteButtonClick(id);      
    }
    render() {
        return (
        <tr>
        <td >{this.props.stt+1}</td>
        <td>{this.props.topic}</td>
        <td>{this.props.detail}</td>
        <td>
          <div className="btn btn-warning" onClick={()=>this.editClick()}><i className="fa fa-edit ">Sửa</i></div> 
          <div className="btn btn-danger" onClick={()=>this.deleteButtonClick(this.props.s)}><i className="fa fa-delete ">Xóa</i></div> 
        </td>
      </tr>  
        );
    }
}

export default TableDataRaw;