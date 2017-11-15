import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CreateProjectBtn from '../components/CreateProjectBtn'
import { openWizard, closeWizard } from '../reducers/createProjectBtn'

class CreateProjectBtnContainer extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  checkPackageName = (rule, value, callback) => {
    const form = this.props.form;
    let regex = '^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$'
    if (!value.match(regex)) {
      callback('The package name is invalid!');
    } else {
      callback();
    }
  }

  render() {
    return (
      <CreateProjectBtn
        openWizard={this.props.openWizard}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.handleSubmit}
        form={this.props.form}
        checkPackageName={this.checkPackageName}
      />
    )
  }
}

const mapStateToProps = (state) => {

  const { createProjectBtnReducer } = state
  const { visible } = createProjectBtnReducer || { visible: false }
  return { visible }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openWizard: () => {
      dispatch(openWizard())
    },
    onCancel: () => {
      dispatch(closeWizard())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProjectBtnContainer)