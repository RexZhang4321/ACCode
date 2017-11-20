import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FileCtlBtn from '../components/FileCtlBtn'
import { DEFAULT_PROJECT_NAME, DEFAULT_CURRENT_FILE_PATH } from '../reducers/projectConfig'
import { openNewFolder, openNewFile, cancelNewFolder, cancelNewFile, openDeleteFolder, cancelDeleteFolder, openDeleteFile, cancelDeleteFile, createNewFolder, createNewFile, deleteFolder, deleteFile } from '../reducers/fileCtlBtn'

class FileCtlBtnContainer extends Component {

  static propTypes = {
    form: PropTypes.object,
    newFolderVisible: PropTypes.bool,
    newFileVisible: PropTypes.bool,
    cancelNewFolder: PropTypes.func,
    cancelNewFile: PropTypes.func,
    createNewFolder: PropTypes.func,
    createNewFile: PropTypes.func,
    openNewFolder: PropTypes.func,
    openNewFile: PropTypes.func,
    deleteFolderVisible: PropTypes.bool,
    openDeleteFolder: PropTypes.func,
    cancelDeleteFolder: PropTypes.func,
    deleteFolder: PropTypes.func,
    deleteFileVisible: PropTypes.func,
    openDeleteFile: PropTypes.func,
    cancelDeleteFile: PropTypes.func,
    deleteFile: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.createNewFolder = this.createNewFolder.bind(this)
    this.createNewFile = this.createNewFile.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
    this.deleteFolder = this.deleteFolder.bind(this)
  }

  createNewFolder = () => {
    this.props.createNewFolder(this.props.form, this.props.appName, this.props.currentFilePath)
  }

  createNewFile = () => {
    this.props.createNewFile(this.props.form, this.props.appName, this.props.currentFilePath)
  }

  deleteFolder = () => {
    this.props.deleteFolder(this.props.appName, this.props.currentFilePath)
  }

  deleteFile = () => {
    this.props.deleteFile(this.props.appName, this.props.currentFilePath)
  }

  render() {
    return (
      <FileCtlBtn 
        form={this.props.form}
        newFolderVisible={this.props.newFolderVisible}
        newFileVisible={this.props.newFileVisible}
        onCancelNewFolder={this.props.cancelNewFolder}
        onCancelNewFile={this.props.cancelNewFile}
        onCreateNewFolder={this.createNewFolder}
        onCreateNewFile={this.createNewFile}
        onOpenNewFolder={this.props.openNewFolder}
        onOpenNewFile={this.props.openNewFile}
        deleteFolderVisible={this.props.deleteFolderVisible}
        onOpenDeleteFolder={this.props.openDeleteFolder}
        onCancelDeleteFolder={this.props.cancelDeleteFolder}
        onDeleteFolder={this.deleteFolder}
        deleteFileVisible={this.props.deleteFileVisible}
        onOpenDeleteFile={this.props.openDeleteFile}
        onCancelDeleteFile={this.props.cancelDeleteFile}
        onDeleteFile={this.deleteFile}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { fileCtlBtnReducer, projectConfigReducer } = state
  const { newFolderVisible, newFileVisible, deleteFolderVisible, deleteFileVisible } = fileCtlBtnReducer || {
    newFolderVisible: false,
    newFileVisible: false,
    deleteFolderVisible: false,
    deleteFileVisible: false,
  }
  const { appName, currentFilePath } = projectConfigReducer || {
    appName: DEFAULT_PROJECT_NAME,
    currentFilePath: DEFAULT_CURRENT_FILE_PATH
  }
  return { newFolderVisible, newFileVisible, deleteFolderVisible, deleteFileVisible, appName, currentFilePath }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    openNewFolder: () => {
      dispatch(openNewFolder())
    },
    openNewFile: () => {
      dispatch(openNewFile())
    },
    cancelNewFolder: () => {
      dispatch(cancelNewFolder())
    },
    cancelNewFile: () => {
      dispatch(cancelNewFile())
    },
    openDeleteFolder: () => {
      dispatch(openDeleteFolder())
    },
    openDeleteFile: () => {
      dispatch(openDeleteFile())
    },
    cancelDeleteFolder: () => {
      dispatch(cancelDeleteFolder())
    },
    cancelDeleteFile: () => {
      dispatch(cancelDeleteFile())
    },
    createNewFolder: (form, appName, currentFilePath) => {
      form.validateFields((err, values) => {
        if (!err) {
          dispatch(createNewFolder(values, appName, currentFilePath))
        }
      });
    },
    createNewFile: (form, appName, currentFilePath) => {
      form.validateFields((err, values) => {
        if (!err) {
          dispatch(createNewFile(values, appName, currentFilePath))
        }
      });
    },
    deleteFolder: (appName, currentFilePath) => {
      dispatch(deleteFolder(appName, currentFilePath))
    },
    deleteFile: (appName, currentFilePath) => {
      dispatch(deleteFile(appName, currentFilePath))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileCtlBtnContainer)