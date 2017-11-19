import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Toolbar from '../components/Toolbar'
import { fireBuildProject, finishBuildProject } from '../reducers/toolbar'
import { fetchBuildLog } from '../reducers/outputWindow'
import { DEFAULT_PROJECT_NAME, DEFAULT_BUILD_ID } from '../reducers/projectConfig'
import { subscribeServerURL } from '../utils/routing'

class ToolbarContainer extends Component {
  static propTypes = {
    buildProject: PropTypes.func,
    finishBuildProject: PropTypes.func,
    fetchBuildLog: PropTypes.func,
    isBuilding: PropTypes.bool
  }

  fetchBuildLogTimer = null
  eventSource = null

  constructor(props) {
    super(props)
    this.buildProject = this.buildProject.bind(this)
    this._initServerSideEvent = this._initServerSideEvent.bind(this)
  }

  componentWillMount() {
    this._initServerSideEvent(this.props.appName)
  }

  componentWillReceiveProps(nextProps) {
    // buildId has been updated
    if (nextProps.buildId !== this.props.buildId) {
      // read the log
      clearTimeout(this.fetchBuildLogTimer)
      const buildId = nextProps.buildId
      this.fetchBuildLogTimer = setTimeout(() => {
        this.props.fetchBuildLog(buildId, this.props.lastBuildLogTimestamp + 1)
        setTimeout(() => {
          this.props.fetchBuildLog(buildId, this.props.lastBuildLogTimestamp + 1)
        }, 5000);
      }, 5000)
    }

    // appName has been updated
    if (nextProps.appName !== this.props.appName) {
      this.eventSource.close()
      this._initServerSideEvent(nextProps.appName)
    }
  }

  _initServerSideEvent(appName) {
    const url = subscribeServerURL(appName)
    console.log('current project: ' + appName)
    this.eventSource = new EventSource(url)
    this.eventSource.onmessage = (e) => {
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
    this.props.buildProject(this.props.appName)
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
  const { toolbarReducer, outputWindowReducer, projectConfigReducer } = state
  const { isBuilding } = toolbarReducer || { isBuilding: false }
  const { lastBuildLogTimestamp } = outputWindowReducer || { lastBuildLogTimestamp: 0 }
  const { appName, buildId } = projectConfigReducer || {
    appName: DEFAULT_PROJECT_NAME,
    buildId: DEFAULT_BUILD_ID
  }

  return { isBuilding, lastBuildLogTimestamp, appName, buildId }
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