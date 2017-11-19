import { combineReducers } from 'redux'
import explorerReducer from './explorer'
import editorReducer from './editor'
import toolbarReducer from './toolbar'
import createProjectBtnReducer from './createProjectBtn'
import outputWindowReducer from './outputWindow'
import projectConfigReducer from './projectConfig'

// register all the reducers here
const rootReducer = combineReducers({
  explorerReducer,
  editorReducer,
  toolbarReducer,
  createProjectBtnReducer,
  outputWindowReducer,
  projectConfigReducer
})

export default rootReducer
