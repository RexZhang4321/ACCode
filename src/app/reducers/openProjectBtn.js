
// Action types
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'


export default function (state, action) {
  if (!state) {
    state = {
      visible: false,
    }
  }

  switch (action.type) {
    case OPEN_MODAL:
      return Object.assign({}, state, {
        visible: true
      })
    case CLOSE_MODAL:
      return Object.assign({}, state, {
        visible: false
      })
    default:
      return state
  }

}

export const openModal = () => {
  return { type: OPEN_MODAL }
}

export const closeModal = () => {
  return { type: CLOSE_MODAL }
}