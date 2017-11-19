import fetch from 'isomorphic-fetch'
import { createProjectURL } from '../utils/routing'

// Action types
const OPEN_WIZARD = 'OPEN_WIZARD'
const CLOSE_WIZARD = 'CLOSE_WIZARD'
const CREATE_NEW_PROJECT = 'CREATE_NEW_PROJECT'
const FINISH_CREATING = 'FINISH_CREATING'

// Reducer
export default function (state, action) {
  if (!state) {
    state = {
      visible: false,
      isCreating: false,
    }
  }

  switch (action.type) {
    case OPEN_WIZARD:
      return Object.assign({}, state, {
        visible: true
      })
    case CLOSE_WIZARD:
      return Object.assign({}, state, {
        visible: false
      })
    case CREATE_NEW_PROJECT:
      return Object.assign({}, state, {
        isCreating: true
      })
    case FINISH_CREATING:
      return Object.assign({}, state, {
        visible: false,
        isCreating: false
      })
    default:
      return state
  }
}

export const openWizard = () => {
  return { type: OPEN_WIZARD }
}

export const closeWizard = () => {
  return { type: CLOSE_WIZARD }
}

export const createNewProject = () => {
  return { type: CREATE_NEW_PROJECT }
}

export const finishCreating = () => {
  return { type: FINISH_CREATING }
}

export const sendProjectConfig = (project) => {
  return dispatch => {
    dispatch(createNewProject())
    return fetch(createProjectURL(project['Project Name'], project['Package Name'], project['Description']), { method: 'post', body: JSON.stringify(project)}).then(dispatch(finishCreating()))
  }
}