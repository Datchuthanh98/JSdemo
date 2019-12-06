import React, { Component } from 'react';
import TableDataRaw from './TableDataRaw';

class TableData extends Component {
 
   deleteButtonClick=(id)=>{
     this.props.deleteItem(id);  
   }
   
  mappingDataItem=()=>
    this.props.dataItemPops.map((value,key)=>(
      <TableDataRaw 
      hienthiformedit={()=>this.props.hienthiformedit()}
      deleteButtonClick={(id)=>this.deleteButtonClick(id)}
      editFunClick={()=>this.props.editFun(value)} 
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

export default TableData;