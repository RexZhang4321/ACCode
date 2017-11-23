import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Toolbar from '../components/Toolbar'
import { fireBuildProject, finishBuildProject, fireSaveProject } from '../reducers/toolbar'
import { fetchBuildLog, fetchAppLog } from '../reducers/outputWindow'
import { DEFAULT_PROJECT_NAME, DEFAULT_BUILD_ID, DEFAULT_CURRENT_FILE_PATH } from '../reducers/projectConfig'
import { DEFAULT_CONTENT } from '../reducers/editor'
import { subscribeServerURL } from '../utils/routing'

class ToolbarContainer extends Component {
  static propTypes = {
    buildProject: PropTypes.func,
    finishBuildProject: PropTypes.func,
    fetchBuildLog: PropTypes.func,
    fetchAppLog: PropTypes.func,
    isBuilding: PropTypes.bool,
    isSaving: PropTypes.bool,
    saveProject: PropTypes.func,
  }

  fetchBuildLogTimer = null
  fetchAppLogTimer = null
  eventSource = null

  constructor(props) {
    super(props)
    this.buildProject = this.buildProject.bind(this)
    this._initServerSideEvent = this._initServerSideEvent.bind(this)
    this.saveProject = this.saveProject.bind(this)
    this._fetchBuildLog = this._fetchBuildLog.bind(this)
    this._fetchAppLog = this._fetchAppLog.bind(this)
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
      this._fetchBuildLog(buildId)
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
          clearTimeout(this.fetchAppLogTimer)
          this._fetchAppLog()
        default:
          console.log('no matching event!')
      }
    }
  }

  _fetchBuildLog(buildId) {
    this.props.fetchBuildLog(buildId, this.props.lastBuildLogTimestamp + 1)
    this.fetchBuildLogTimer = setTimeout(this._fetchBuildLog, 5000, buildId)
  }

  _fetchAppLog() {
    this.props.fetchAppLog(this.props.appName, this.props.lastAppLogTimestamp)
    this.fetchAppLogTimer = setTimeout(this._fetchAppLog, 5000)
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

  saveProject() {
    this.props.saveProject(this.props.appName, this.props.currentFilePath, this.props.content)
  }

  render() {
    return (
      <Toolbar
        onBuildProject={this.buildProject}
        isBuilding={this.props.isBuilding}
        isSaving={this.props.isSaving}
        onSaveProject={this.saveProject}
        onOpenEmulator={this.openEmulator}
      />
    )
  }

}

const mapStateToProps = (state) => {
  const { toolbarReducer, outputWindowReducer, projectConfigReducer, editorReducer } = state
  const { isBuilding } = toolbarReducer || { isBuilding: false }
  const { isSaving } = toolbarReducer || { isSaving: false }
  const { lastBuildLogTimestamp, lastAppLogTimestamp } = outputWindowReducer || { lastBuildLogTimestamp: 0, lastAppLogTimestamp: Date.now() }
  const { appName, buildId, currentFilePath } = projectConfigReducer || {
    appName: DEFAULT_PROJECT_NAME,
    buildId: DEFAULT_BUILD_ID,
    currentFilePath: DEFAULT_CURRENT_FILE_PATH
  }
  const { content } = editorReducer || { content: DEFAULT_CONTENT }
  return { isBuilding, lastBuildLogTimestamp, lastAppLogTimestamp, appName, buildId, isSaving, content, currentFilePath }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buildProject: (projectName) => {
      dispatch(fireBuildProject(projectName))
    },
    saveProject: (projectName, path, content) => {
      dispatch(fireSaveProject(projectName, path, content))
    },
    finishSaveProject: () => {
      dispatch(finishSaveProject())
    },
    finishBuildProject: () => {
      dispatch(finishBuildProject())
    },
    fetchBuildLog: (buildId, startTime) => {
      dispatch(fetchBuildLog(buildId, startTime))
    },
    fetchAppLog: (appName, startTime) => {
      console.log(appName, startTime)
      dispatch(fetchAppLog(appName, startTime))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarContainer)