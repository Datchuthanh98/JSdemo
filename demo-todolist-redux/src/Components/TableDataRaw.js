import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ItemDel } from '../actions'

class TableDataRaw extends Component {
  
   EditItem=()=>{
   this.props.isEdit();
   this.props.getEDit(this.props.note)
   }
  
  render() {
    return (
      <tr>
        <td >{this.props.stt + 1}</td>
        <td>{this.props.topic}</td>
        <td>{this.props.detail}</td>
        <td>
          <div className="btn btn-warning" onClick={() => this.EditItem()}><i className="fa fa-edit ">Sửa</i></div>
          <div className="btn btn-danger"  onClick={() => this.props.DelItem(this.props.id)}><i className="fa fa-delete ">Xóa</i></div>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    isEdit: () =>dispatch({ type: "EDIT" }),
    getEDit: (item) =>dispatch({ type:"GET_EDIT",item}),
    DelItem:(id)=>{dispatch(ItemDel(id))}
}
}
export default connect(null, mapDispatchToProps)(TableDataRaw);