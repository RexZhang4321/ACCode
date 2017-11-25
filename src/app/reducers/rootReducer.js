import { combineReducers } from 'redux'
import explorerReducer from './explorer'
import editorReducer from './editor'
import toolbarReducer from './toolbar'
import createProjectBtnReducer from './createProjectBtn'
import outputWindowReducer from './outputWindow'
import projectConfigReducer from './projectConfig'
import fileCtlBtnReducer from './fileCtlBtn'
import openProjectBtnReducer from './openProjectBtn'

// register all the reducers here
const rootReducer = combineReducers({
  explorerReducer,
  editorReducer,
  toolbarReducer,
  createProjectBtnReducer,
  outputWindowReducer,
  projectConfigReducer,
  fileCtlBtnReducer,
  openProjectBtnReducer
})

export default rootReducer
