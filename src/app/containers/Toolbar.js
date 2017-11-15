import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Toolbar from '../components/Toolbar'
import { fireBuildProject, finishBuildProject } from '../reducers/toolbar'
import { fetchBuildLog } from '../reducers/outputWindow'

class ToolbarContainer extends Component {
  static propTypes = {
    buildProject: PropTypes.func,
    finishBuildProject: PropTypes.func,
    fetchBuildLog: PropTypes.func,
    isBuilding: PropTypes.bool
  }

  fetchBuildLogTimer = null

  constructor(props) {
    super(props)
    this.buildProject = this.buildProject.bind(this)
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
          clearTimeout(this.fetchBuildLogTimer)
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

  buildProject() {
    this.props.buildProject('android-build-sdk-base')
    clearTimeout(this.fetchBuildLogTimer)
    const buildId = 'android-build-sdk-base:22f82d4c-82e8-4dee-a975-717661a323c4'
    this.fetchBuildLogTimer = setTimeout(() => {
      this.props.fetchBuildLog(buildId, this.props.lastBuildLogTimestamp + 1)
      setTimeout(() => {
        this.props.fetchBuildLog(buildId, this.props.lastBuildLogTimestamp + 1)
      }, 5000);
    }, 5000)
  }

  render() {
    return (
      <Toolbar
        onBuildProject={this.buildProject}
        isBuilding={this.props.isBuilding}
        onOpenEmulator={this.openEmulator}
      />
    )
  }

}

const mapStateToProps = (state) => {
  const { toolbarReducer, outputWindowReducer } = state
  const { isBuilding } = toolbarReducer || { isBuilding: false }
  const { lastBuildLogTimestamp } = outputWindowReducer || { lastBuildLogTimestamp: 0 }

  return { isBuilding, lastBuildLogTimestamp }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buildProject: (projectName) => {
      dispatch(fireBuildProject(projectName))
    },
    finishBuildProject: () => {
      dispatch(finishBuildProject())
    },
    fetchBuildLog: (buildId, startTime) => {
      dispatch(fetchBuildLog(buildId, startTime))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarContainer)