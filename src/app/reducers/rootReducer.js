import { combineReducers } from 'redux'
import explorerReducer from './explorer'
import editorReducer from './editor'
import toolbarReducer from './toolbar'

// register all the reducers here
const rootReducer = combineReducers({
  explorerReducer,
  editorReducer,
  toolbarReducer
})

export default rootReducer
