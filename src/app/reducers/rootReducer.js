import { combineReducers } from 'redux'
import explorerReducer from './explorer'
import editorReducer from './editor'
import toolbarReducer from './toolbar'
import createProjectBtnReducer from './createProjectBtn'

// register all the reducers here
const rootReducer = combineReducers({
  explorerReducer,
  editorReducer,
  toolbarReducer,
  createProjectBtnReducer,
})

export default rootReducer
