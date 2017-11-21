import fetch from 'isomorphic-fetch'
import { createFolderURL, createFileURL, deleteFolderURL, deleteFileURL } from '../utils/routing'

//Action types
const OPEN_NEW_FOLDER = "OPEN_NEW_FOLDER"
const OPEN_NEW_FILE = "OPEN_NEW_FILE"
const CANCEL_NEW_FOLDER = "CANCEL_NEW_FOLDER"
const CANCEL_NEW_FILE = "CANCEL_NEW_FILE"
const OPEN_DELETE_FOLDER = "OPEN_DELETE_FOLDER"
const OPEN_DELETE_FILE = "OPEN_DELETE_FILE"
const CANCEL_DELETE_FOLDER = "CANCEL_DELETE_FOLDER"
const CANCEL_DELETE_FILE = "CANCEL_DELETE_FILE"


export default function (state, action) {
  if (!state) {
    state = {
      newFolderVisible: false,
      newFileVisible: false,
      deleteFolderVisible: false,
      deleteFileVisible: false,
    }
  }
  switch (action.type) {
    case OPEN_NEW_FOLDER:
      return Object.assign({}, state, {
        newFolderVisible: true
      })
    case OPEN_NEW_FILE:
      return Object.assign({}, state, {
        newFileVisible: true
      })
    case CANCEL_NEW_FOLDER:
      return Object.assign({}, state, {
        newFolderVisible: false
      })
    case CANCEL_NEW_FILE:
      return Object.assign({}, state, {
        newFileVisible: false
      })
    case OPEN_DELETE_FOLDER:
      return Object.assign({}, state, {
        deleteFolderVisible: true
      })
    case OPEN_DELETE_FILE:
      return Object.assign({}, state, {
        deleteFileVisible: true
      })
    case CANCEL_DELETE_FOLDER:
      return Object.assign({}, state, {
        deleteFolderVisible: false
      })
    case CANCEL_DELETE_FILE:
      return Object.assign({}, state, {
        deleteFileVisible: false
      })
    default:
      return state
  }
}

export const openNewFolder = () => {
  return { type: OPEN_NEW_FOLDER }
}

export const openNewFile = () => {
  return { type: OPEN_NEW_FILE }
}

export const cancelNewFolder = () => {
  return { type: CANCEL_NEW_FOLDER }
}

export const cancelNewFile = () => {
  return { type: CANCEL_NEW_FILE }
}

export const openDeleteFolder = () => {
  return { type: OPEN_DELETE_FOLDER }
}

export const openDeleteFile = () => {
  return { type: OPEN_DELETE_FILE }
}

export const cancelDeleteFolder = () => {
  return { type: CANCEL_DELETE_FOLDER }
}

export const cancelDeleteFile = () => {
  return { type: CANCEL_DELETE_FILE }
}

export const createNewFolder = (values, appName, currentFolder) => {
  const data = {
    appName: appName,
    currentFolder: currentFolder,
    isFolder: true,
    name: values['Folder Name']
  }
  return dispatch => {
    dispatch(cancelNewFolder())
    return fetch(createFolderURL(appName, currentFolder), { method: 'post', body: JSON.stringify(data) })
  }
}

export const createNewFile = (values, appName, currentFolder) => {
  const data = {
    appName: appName,
    currentFolder: currentFolder,
    isFolder: false,
    name: values['File Name']
  }
  return dispatch => {
    dispatch(cancelNewFile())
    return fetch(createFileURL(appName, currentFolder), { method: 'post', body: JSON.stringify(data) })
  }
}

export const deleteFolder = (appName, currentFolder) => {
  const data = {
    appName: appName,
    currentFolder: currentFolder,
    isFolder: true,
  }
  return dispatch => {
    dispatch(cancelDeleteFolder())
    return fetch(deleteFolderURL(appName, currentFolder), { method: 'post', body: JSON.stringify(data)})
  }
}

export const deleteFile = (appName, currentFilePath) => {
  const data = {
    appName: appName,
    currentFilePath: currentFilePath,
    isFolder: false,
  }
  return dispatch => {
    dispatch(cancelDeleteFile())
    return fetch(deleteFileURL(appName, currentFilePath), { method: 'post', body: JSON.stringify(data)})
  }
}