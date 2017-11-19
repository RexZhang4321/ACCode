import fetch from 'isomorphic-fetch'
import { explorerGetDirURL } from '../utils/routing'

// Action types
const REQUEST_PROJECT = 'REQUEST_PROJECT'
const RECEIVE_PROJECT = 'RECEIVE_PROJECT'

// Reducer
export default function(state, action) {
  if (!state) {
    state = {
      projectDir: {},
      isFetching: false
    }
  }
  switch (action.type) {
    case REQUEST_PROJECT:
      return Object.assign({}, state, {
        isFetching: true,
        projectDir: {}
      })
    case RECEIVE_PROJECT:
      return Object.assign({}, state, {
        isFetching: false,
        projectDir: action.projectDir
      })
    default:
      return state
  }
}

export const requestProject = () => {
  return { type: REQUEST_PROJECT }
}

export const receiveProject = (projectDir) => {
  return {
    type: RECEIVE_PROJECT,
    projectDir: projectDir
  }
}

export const fetchProject = (appName) => {
  return dispatch => {
    dispatch(requestProject())
    return fetch(explorerGetDirURL(appName))
      .then(response => response.json())
      .then(json => dispatch(receiveProject(json)))
  }
}
