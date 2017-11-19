import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CreateProjectBtn from '../components/CreateProjectBtn'
import { openWizard, closeWizard, sendProjectConfig } from '../reducers/createProjectBtn'

class CreateProjectBtnContainer extends Component {

  static propTypes = {
    openWizard: PropTypes.func,
    visible: PropTypes.bool,
    isCreating: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    form: PropTypes.object,
  }

  checkPackageName = (rule, value, callback) => {
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
        isCreating={this.props.isCreating}
        onCancel={this.props.onCancel}
        onOk={this.props.onOk}
        form={this.props.form}
        checkPackageName={this.checkPackageName}
      />
    )
  }
}

const mapStateToProps = (state) => {

  const { createProjectBtnReducer } = state
  const { visible } = createProjectBtnReducer || { visible: false }
  const { isCreating } = createProjectBtnReducer || { isCreating: false }
  return { visible, isCreating }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openWizard: () => {
      dispatch(openWizard())
    },
    onCancel: () => {
      dispatch(closeWizard())
    },
    onOk: (form) => {
      form.validateFields((err, values) => {
      if (!err) {
        dispatch(sendProjectConfig(values))
      }
      });
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProjectBtnContainer)