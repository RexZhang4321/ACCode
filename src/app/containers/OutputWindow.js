import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OutputWindow from '../components/OutputWindow'
import { fetchBuildLog } from '../reducers/outputWindow'

class OutputWindowContainer extends Component {
  static propTypes = {
    buildLog: PropTypes.array,
    lastBuildLogTimestamp: PropTypes.number,
    appLog: PropTypes.string,
    lastAppLogTimestamp: PropTypes.number
  }

  render() {
    return (
      <OutputWindow
        buildLog={this.props.buildLog}
        lastBuildLogTimestamp={this.props.lastBuildLogTimestamp}
        appLog={this.props.appLog}
        lastAppLogTimestamp={this.props.lastAppLogTimestamp}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { outputWindowReducer } = state
  const {
    buildLog,
    lastBuildLogTimestamp,
    appLog,
    lastAppLogTimestamp
  } = outputWindowReducer || {
    buildLog: [],
    lastBuildLogTimestamp: 0,
    appLog: '',
    lastAppLogTimestamp: Date.now()
  }

  return {
    buildLog,
    lastBuildLogTimestamp,
    appLog,
    lastAppLogTimestamp
  }
}

export default connect(
  mapStateToProps
)(OutputWindowContainer)