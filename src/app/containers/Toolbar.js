import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Toolbar from '../components/Toolbar'
import { fireBuildProject, finishBuildProject } from '../reducers/toolbar'

class ToolbarContainer extends Component {
  static propTypes = {
    buildProject: PropTypes.func,
    finishBuildProject: PropTypes.func,
    isBuilding: PropTypes.bool
  }

  componentWillMount() {
    this._initServerSideEvent()
  }

  _initServerSideEvent() {
    const url = 'http://localhost:5000/subscribeServer?project=' + 'test-android-hello'
    const source = new EventSource(url)
    source.onmessage = (e) => {
      const response = JSON.parse(e.data)
      switch (response.action) {
        case 'build-finished':
          this.props.finishBuildProject()
        default:
          console.log('no matching event!')
      }
    }
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
    },
    finishBuildProject: () => {
      dispatch(finishBuildProject())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarContainer)