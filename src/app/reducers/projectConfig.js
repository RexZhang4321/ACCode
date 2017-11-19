// Action types
const SET_PROJECT_NAME = 'SET_PROJECT_NAME'
const SET_BUILD_ID = 'SET_BUILD_ID'
const SET_CURRENT_FILE_PATH = 'SET_CURRENT_FILE_PATH'

export const DEFAULT_PROJECT_NAME = 'test-android-hello'
export const DEFAULT_BUILD_ID = 'android-build-sdk-base:22f82d4c-82e8-4dee-a975-717661a323c4'
export const DEFAULT_CURRENT_FILE_PATH = 'null'

// Reducer
export default function(state, action) {
  if (!state) {
    state = {
      appName: DEFAULT_PROJECT_NAME,
      buildId: DEFAULT_BUILD_ID,
      currentFilePath: DEFAULT_CURRENT_FILE_PATH
    }
  }
  switch (action.type) {
    case SET_PROJECT_NAME:
      return Object.assign({}, state, {
        appName: action.appName
      })
    case SET_BUILD_ID:
      return Object.assign({}, state, {
        buildId: action.buildId
      })
    case SET_CURRENT_FILE_PATH:
      return Object.assign({}, state, {
        currentFilePath: action.currentFilePath
      })
    default:
      return state
  }
}

export const setProjectName = (appName) => {
  return { 
    type: SET_PROJECT_NAME,
    appName: appName
  }
}

export const setBuildId = (buildId) => {
  return {
    type: SET_BUILD_ID,
    buildId: buildId
  }
}

export const setCurrentFile = (currFilePath) => {
  return {
    type: SET_CURRENT_FILE_PATH,
    currentFilePath: currFilePath
  }
}
