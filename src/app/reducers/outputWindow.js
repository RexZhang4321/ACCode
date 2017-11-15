import fetch from 'isomorphic-fetch'

// action types
const RECEIVE_BUILD_LOG = 'RECEIVE_BUILD_LOG'

// Reducer
export default function(state, action) {
  if (!state) {
    state = {
      buildLog: [],
      lastBuildLogTimestamp: 0
    }
  }
  switch (action.type) {
    case RECEIVE_BUILD_LOG:
      return Object.assign({}, state, {
        buildLog: [...state.buildLog, ...action.buildLog],
        lastBuildLogTimestamp: action.lastBuildLogTimestamp == 0 ? state.lastBuildLogTimestamp : action.lastBuildLogTimestamp
      })
    default:
      return state
  }
}

export const receiveBuildLog = (buildLog) => {
  return {
    type: RECEIVE_BUILD_LOG,
    buildLog: buildLog.events,
    lastBuildLogTimestamp: buildLog.events.length == 0 ? 0 : buildLog.events[buildLog.events.length - 1].timestamp
  }
}

export const fetchBuildLog = (buildId, startTime) => {
  return dispatch => {
    return fetch('http://localhost:5000/tools/buildlog?buildId=' + buildId + '&startTime=' + startTime.toString())
      .then(response => response.json())
      .then(json => dispatch(receiveBuildLog(json)))
  }
}
