import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Explorer from '../components/Explorer'
import { fetchProject } from '../reducers/explorer'
import { fetchFileContent } from '../reducers/editor'

class ExplorerContainer extends Component {
  static propTypes = {
    projectDir: PropTypes.object,
    isFetching: PropTypes.bool,
    fetchProject: PropTypes.func,
    fetchFileContent: PropTypes.func
  }

  componentWillMount() {
    this._loadProject()
  }

  _loadProject() {
    this.props.fetchProject()
  }

  render() {
    return (
      <Explorer
        projectDir={this.props.projectDir}
        isFetching={this.props.isFetching}
        onLoadEditorContent={this.props.fetchFileContent}
      />
    )
  }

}

const mapStateToProps = (state) => {
  const { explorerReducer } = state
  const {
    projectDir,
    isFetching
  } = explorerReducer || {
    projectDir: {},
    isFetching: false
  }

  return {
    projectDir,
    isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: () => {
      dispatch(fetchProject())
    },
    fetchFileContent: (path) => {
      dispatch(fetchFileContent(path))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExplorerContainer)
