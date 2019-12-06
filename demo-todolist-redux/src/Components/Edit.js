import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editItemtoNode } from '../actions'

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      topic: "",
      detail: ""
    }
  }

  componentWillMount() {
    if (this.props.itemedit) {
      this.setState({
        id: this.props.itemedit.id,
        topic: this.props.itemedit.topic,
        detail: this.props.itemedit.detail

      })
    }
  }


  isChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    }, () => { console.log(this.state) })
  }

  editOk = () => {
    let fixed = {};
    fixed.id = this.state.id;
    fixed.topic = this.state.topic;
    fixed.detail = this.state.detail
    console.log("du lieu da dc fix la" + fixed.detail);
    this.props.EditStoreOK(fixed);
  }

  render() {
    return (
      <div>
        <div className="col">
          <div className="card border-primary mb-3 mt-2">
            <div className="card-header" align="center">Sửa ghi chú </div>
            <div className="card-body text-primary">
              <form>
                <div className="form-group">
                  <input onChange={(event) => { this.isChange(event) }} name="topic" type="text" className="form-control" placeholder="Tên ghi chú"
                    value={this.state.topic} /></div>
                <div className="form-group">
                  <textarea onChange={(event) => { this.isChange(event) }} name="detail" className="form-control" placeholder="Chi tiết"
                    value={this.state.detail} /></div>
                <div className="form-group">
                  <input type="button" className="btn btn-block btn-primary"
                    onClick={() => this.editOk()}
                    value="Sửa" />
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
    itemedit: state.itemedit
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    EditStoreOK: (fixed) => {
      dispatch(editItemtoNode(fixed))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);