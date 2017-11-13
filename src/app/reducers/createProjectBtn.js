import fetch from 'isomorphic-fetch'

// Action types
const OPEN_WIZARD = 'OPEN_WIZARD'
const CLOSE_WIZARD = 'CLOSE_WIZARD'

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