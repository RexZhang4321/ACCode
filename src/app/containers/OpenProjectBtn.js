import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OpenProjectBtn from '../components/OpenProjectBtn'
import { openModal, closeModal } from '../reducers/openProjectBtn'
import { setProjectName } from '../reducers/projectConfig'

class OpenProjectBtnContainer extends Component {

  static propTypes = {
    openProject: PropTypes.func,
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    form: PropTypes.object,
  }

  render() {
    return (
      <OpenProjectBtn
        form = {this.props.form}
        onOpenProject = {this.props.openProject}
        visible = {this.props.visible}
        onCancel = {this.props.onCancel}
        onOk = {this.props.setProject}
      />
    )
  }

}

const mapStateToProps = (state) => {
  
    const { openProjectBtnReducer } = state
    const { visible } = openProjectBtnReducer || { visible: false }
    return { visible }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      openProject: () => {
        console.log("open modal!")
        dispatch(openModal())
      },
      onCancel: () => {
        dispatch(closeModal())
      },
      setProject: (form) => {
        form.validateFields((err, values) => {
          if (!err) {
            dispatch(setProjectName(values['Project Name']))
            dispatch(closeModal())
          }
        });
      }
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(OpenProjectBtnContainer)