import fetch from 'isomorphic-fetch'
import { buildProjectURL, saveProjectURL } from '../utils/routing'
import { setBuildId } from './projectConfig'

// Action types
const REQUEST_BUILD_PROJECT = 'REQUEST_BUILD_PROJECT'
const FINISH_BUILD_PROJECT = 'FINISH_BUILD_PROJECT'
const REQUEST_SAVE_PROJECT = 'REQUEST_SAVE_PROJECT'
const FINISH_SAVE_PROJECT = 'FINISH_SAVE_PROJECT'

// Reducer
export default function(state, action) {
  if (!state) {
    state = {
      isBuilding: false,
      isSaving: false
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
    case REQUEST_SAVE_PROJECT:
      return Object.assign({}, state, {
        isSaving: true
      })
    case FINISH_SAVE_PROJECT:
      return Object.assign({}, state, {
        isSaving: false
      })
    default:
      return state
  }
}

export const requestBuildProject = () => {
  return { type: REQUEST_BUILD_PROJECT }
}

export const requestSaveProject = () => {
  return { type: REQUEST_SAVE_PROJECT }
}

export const finishBuildProject = () => {
  return { type: FINISH_BUILD_PROJECT }
}

export const finishSaveProject = () => {
  return { type: FINISH_SAVE_PROJECT }
}

export const fireSaveProject = (projectName, filepath) => {
  return dispatch => {
    dispatch(requestSaveProject())
    return fetch(saveProjectURL(projectName, filepath))
      .then(response => dispatch(finishSaveProject()))
  }
}

export const fireBuildProject = (projectName) => {
  return dispatch => {
    dispatch(requestBuildProject())
    return fetch(buildProjectURL(projectName))
      .then(response => (response.text()))
      .then(buildId => dispatch(setBuildId(buildId)))
  }
}