import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FileCtlBtn from '../components/FileCtlBtn'
import { openNewFolder, openNewFile, cancelNewFolder, cancelNewFile, openDeleteFolder, cancelDeleteFolder, openDeleteFile, cancelDeleteFile } from '../reducers/fileCtlBtn'

class FileCtlBtnContainer extends Component {

  render() {
    return (
      <FileCtlBtn 
        form={this.props.form}
        newFolderVisible={this.props.newFolderVisible}
        newFileVisible={this.props.newFileVisible}
        onCancelNewFolder={this.props.cancelNewFolder}
        onCancelNewFile={this.props.cancelNewFile}
        onCreateNewFolder={this.props.createNewFolder}
        onCreateNewFile={this.props.createNewFile}
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
  const { fileCtlBtnReducer } = state
  const { newFolderVisible } = fileCtlBtnReducer || { newFolderVisible: false }
  const { newFileVisible } = fileCtlBtnReducer || { newFileVisible: false }
  const { deleteFolderVisible } = fileCtlBtnReducer || { deleteFolderVisible: false }
  const { deleteFileVisible } = fileCtlBtnReducer || { deleteFileVisible: false }
  return { newFolderVisible, newFileVisible, deleteFolderVisible, deleteFileVisible }
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
    createNewFolder: (form) => {
      form.validateFields((err, values) => {
      if (!err) {
        dispatch(createNewFolder(values))
      }
      });
    },
    createNewFile: (form) => {
      form.validateFields((err, values) => {
      if (!err) {
        dispatch(createNewFile(values))
      }
      });
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileCtlBtnContainer)