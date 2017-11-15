import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OutputWindow from '../components/OutputWindow'
import { fetchBuildLog } from '../reducers/outputWindow'

class OutputWindowContainer extends Component {
  static propTypes = {
    buildLog: PropTypes.array,
    lastBuildLogTimestamp: PropTypes.number
  }

  render() {
    return (
      <OutputWindow
        buildLog={this.props.buildLog}
        lastBuildLogTimestamp={this.props.lastBuildLogTimestamp}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { outputWindowReducer } = state
  const { buildLog, lastBuildLogTimestamp } = outputWindowReducer || { buildLog: [], lastBuildLogTimestamp: 0 }

  return {
    buildLog,
    lastBuildLogTimestamp
  }
}

export default connect(
  mapStateToProps
)(OutputWindowContainer)