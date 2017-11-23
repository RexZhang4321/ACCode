import fetch from 'isomorphic-fetch'
import { getBuildLogURL, getAppLogURL } from '../utils/routing'

// action types
const RECEIVE_BUILD_LOG = 'RECEIVE_BUILD_LOG'
const RECEIVE_APP_LOG = 'RECEIVE_APP_LOG'

// Reducer
export default function(state, action) {
  if (!state) {
    state = {
      buildLog: [],
      lastBuildLogTimestamp: 0,
      appLog: '',
      lastAppLogTimestamp: Date.now()
    }
  }
  switch (action.type) {
    case RECEIVE_BUILD_LOG:
      return Object.assign({}, state, {
        buildLog: [...state.buildLog, ...action.buildLog],
        lastBuildLogTimestamp: action.lastBuildLogTimestamp == 0 ? state.lastBuildLogTimestamp : action.lastBuildLogTimestamp
      })
    case RECEIVE_APP_LOG:
      console.log(action)
      return Object.assign({}, state, {
        appLog: state.appLog + action.appLog,
        lastAppLogTimestamp: action.lastAppLogTimestamp
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


export const receiveAppLog = (appLog, ts) => {
  return {
    type: RECEIVE_APP_LOG,
    appLog: appLog,
    lastAppLogTimestamp: ts
  }
}


export const fetchBuildLog = (buildId, startTime) => {
  return dispatch => {
    return fetch(getBuildLogURL(buildId, startTime.toString()))
      .then(response => response.json())
      .then(json => dispatch(receiveBuildLog(json)))
  }
}

export const fetchAppLog = (appName, ts) => {
  return dispatch => {
    return fetch(getAppLogURL(appName, ts))
      .then(response => response.json())
      .then(json => dispatch(receiveAppLog(json.appLog, json.lastAppLogTimestamp)))
  }
}
