import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FileCtlBtn from '../components/FileCtlBtn'
import { DEFAULT_PROJECT_NAME, DEFAULT_CURRENT_FILE_PATH } from '../reducers/projectConfig'
import { openNewFolder, openNewFile, cancelNewFolder, cancelNewFile, openDeleteFolder, cancelDeleteFolder, openDeleteFile, cancelDeleteFile, createNewFolder, createNewFile } from '../reducers/fileCtlBtn'

class FileCtlBtnContainer extends Component {

  constructor(props) {
    super(props)
    this.createNewFolder = this.createNewFolder.bind(this)
    this.createNewFile = this.createNewFile.bind(this)
  }

  createNewFolder = () => {
    this.props.createNewFolder(this.props.form, this.props.appName, this.props.currentFilePath)
  }

  createNewFile = () => {
    this.props.createNewFile(this.props.form, this.props.appName, this.props.currentFilePath)
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
        onDeleteFolder={this.props.deleteFolder}
        deleteFileVisible={this.props.deleteFileVisible}
        onOpenDeleteFile={this.props.openDeleteFile}
        onCancelDeleteFile={this.props.cancelDeleteFile}
        onDeleteFile={this.props.deleteFile}
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
          console.log(currentFilePath)
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileCtlBtnContainer)