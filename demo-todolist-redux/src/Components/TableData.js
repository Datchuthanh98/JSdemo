import React, { Component } from 'react';
import TableDataRaw from './TableDataRaw';
import { connect } from 'react-redux';


class TableData extends Component {
 
  
 mappingDataItem=()=>
 this.props.data.map((value,key)=>(
   <TableDataRaw 
   note={value}
   id={value.id}
   topic={value.topic} 
   key={key} stt={key} 
   detail={value.detail} >
  </TableDataRaw>
 ))
  
  
  render() {
 return (             
  <div className="col">
  <table className="table table-striped table-hover">
      <tr>
        <th>STT</th>
        <th>Việc làm</th>
        <th>Nội dung chi tiết</th>
        <th>Thao tác</th>
      </tr>
    <tbody>
      {this.mappingDataItem()}
    </tbody>
  </table>
</div>           
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.listItems 
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    AddItem: () => {
      dispatch({type:"ADD"})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TableData);