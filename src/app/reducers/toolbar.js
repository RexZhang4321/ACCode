import fetch from 'isomorphic-fetch'
import { buildProjectURL } from '../utils/routing'

// Action types
const REQUEST_BUILD_PROJECT = 'REQUEST_BUILD_PROJECT'
const FINISH_BUILD_PROJECT = 'FINISH_BUILD_PROJECT'

// Reducer
export default function(state, action) {
  if (!state) {
    state = {
      isBuilding: false
    }
  }
  switch (action.type) {
    case REQUEST_BUILD_PROJECT:
      return Object.assign({}, state, {
        isBuilding: true
      })
    case FINISH_BUILD_PROJECT:
      return Object.assign({}, state, {
        isBuilding: false
      })
    default:
      return state
  }
}

export const requestBuildProject = () => {
  return { type: REQUEST_BUILD_PROJECT }
}

export const finishBuildProject = () => {
  return { type: FINISH_BUILD_PROJECT }
}

export const fireBuildProject = (projectName) => {
  return dispatch => {
    dispatch(requestBuildProject())
    return fetch(buildProjectURL(projectName))
  }
}