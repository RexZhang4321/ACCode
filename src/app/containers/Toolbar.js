import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Toolbar from '../components/Toolbar'
import { fireBuildProject } from '../reducers/toolbar'

class ToolbarContainer extends Component {
  static propTypes = {
    buildProject: PropTypes.func,
    isBuilding: PropTypes.bool
  }

  openEmulator() {
    emulatorWindow = window.open('about:blank', 'android 6.0 emulator')
    if (window.focus) {
      emulatorWindow.focus()
    }
  }

  render() {
    return (
      <Toolbar
        onBuildProject={this.props.buildProject}
        isBuilding={this.props.isBuilding}
        onOpenEmulator={this.openEmulator}
      />
    )
  }

}

const mapStateToProps = (state) => {
  const { toolbarReducer } = state
  const { isBuilding } = toolbarReducer || { isBuilding: false }

  return { isBuilding }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buildProject: (projectName) => {
      dispatch(fireBuildProject(projectName))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarContainer)