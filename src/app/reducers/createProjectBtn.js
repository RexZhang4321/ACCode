import fetch from 'isomorphic-fetch'

// Action types
const OPEN_WIZARD = 'OPEN_WIZARD'
const CLOSE_WIZARD = 'CLOSE_WIZARD'
const CREATE_NEW_PROJECT = 'CREATE_NEW_PROJECT'

// Reducer
export default function (state, action) {
  if (!state) {
    state = {
      visible: false,
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
        visible: false
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

export const sendProjectConfig = (project) => {
  return dispatch => {
    dispatch(createNewProject())
    return fetch('http://localhost:8888/?name=' + project['Project Name'] + '&package=' + project['Package Name'] + '&description=' + project['Description'])
  }
}