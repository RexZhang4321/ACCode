import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Explorer from '../components/Explorer'
import { fetchProject } from '../reducers/explorer'
import { fetchFileContent } from '../reducers/editor'
import { DEFAULT_PROJECT_NAME } from '../reducers/projectConfig'

class ExplorerContainer extends Component {
  static propTypes = {
    projectDir: PropTypes.object,
    isFetching: PropTypes.bool,
    fetchProject: PropTypes.func,
    fetchFileContent: PropTypes.func
  }

  constructor(props) {
    super(props)
    this._loadProject = this._loadProject.bind(this)
  }

  componentWillMount() {
    console.log(this.props.appName)
    this._loadProject(this.props.appName)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appName !== this.props.appName) {
      console.log(nextProps.appName)
      this._loadProject(nextProps.appName)
    }
  }

  _loadProject(appName) {
    this.props.fetchProject(appName)
  }

  render() {
    return (
      <Explorer
        appName={this.props.appName}
        projectDir={this.props.projectDir}
        isFetching={this.props.isFetching}
        onLoadEditorContent={this.props.fetchFileContent}
      />
    )
  }

}

const mapStateToProps = (state) => {
  const { explorerReducer, projectConfigReducer } = state
  const {
    projectDir,
    isFetching
  } = explorerReducer || {
    projectDir: {},
    isFetching: false
  }
  const { appName } = projectConfigReducer || { appName: DEFAULT_PROJECT_NAME }

  return {
    projectDir,
    isFetching,
    appName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: (appName) => {
      dispatch(fetchProject(appName))
    },
    fetchFileContent: (appName, path) => {
      dispatch(fetchFileContent(appName, path))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExplorerContainer)
