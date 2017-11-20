import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Button, Modal, Form, Input } from 'antd'
const FormItem = Form.Item

export default class FileCtlBtn extends Component {

  static propTypes = {
    newFolderVisible: PropTypes.bool,
    newFileVisible: PropTypes.bool,
    onCancelNewFolder: PropTypes.func,
    onCancelNewFile: PropTypes.func,
    onCreateNewFolder: PropTypes.func,
    onCreateNewFile: PropTypes.func,
    onOpenNewFolder: PropTypes.func,
    onOpenNewFile: PropTypes.func,

    deleteFolderVisible: PropTypes.bool,
    onOpenDeleteFolder: PropTypes.func,
    onCancelDeleteFolder: PropTypes.func,
    onDeleteFolder: PropTypes.func,
    deleteFileVisible: PropTypes.bool,
    onOpenDeleteFile: PropTypes.func,
    onCancelDeleteFile: PropTypes.func,
    onDeleteFile: PropTypes.func,
    form: PropTypes.object,
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button style={{width: "105px"}} onClick={this.props.onOpenNewFolder}>New Folder</Button>
        <Button style={{width: "105px"}} onClick={this.props.onOpenDeleteFolder} type="danger">Delete Folder</Button>
        <Button style={{width: "105px"}} onClick={this.props.onOpenNewFile}>New File</Button>
        <Button style={{width: "105px"}} onClick={this.props.onOpenDeleteFile} type="danger">Delete File</Button>
        {/* create new folder */}
        <Modal
          visible={this.props.newFolderVisible}
          bodyStyle={{
            overflow: 'auto',
          }}
          onCancel={this.props.onCancelNewFolder}
          onOk={this.props.onCreateNewFolder}
          title="Create a new folder"
          okText="Create"
          cancelText="Cancel"
        >
          <div ref="dialogContent">
            <Form>
              <FormItem label="Folder Name" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('Folder Name', {
                  rules: [{ required: true, message: 'Please input the folder name' }],
                })(
                  <Input />
                )}
              </FormItem>
            </Form>
          </div>
        </Modal>
        {/* delete a folder */}
        <Modal
          visible={this.props.deleteFolderVisible}
          bodyStyle={{
            overflow: 'auto',
          }}
          onCancel={this.props.onCancelDeleteFolder}
          onOk={this.props.onDeleteFolder}
          title="Delete current folder"
          okText="Delete"
          cancelText="Cancel"
        >
          <h4>Do you want to delete current folder?</h4>
        </Modal>
        {/* create new file */}
        <Modal
          visible={this.props.newFileVisible}
          bodyStyle={{
            overflow: 'auto',
          }}
          onCancel={this.props.onCancelNewFile}
          onOk={this.props.onCreateNewFile}
          title="Create a new file"
          okText="Create"
          cancelText="Cancel"
        >
          <div ref="dialogContent">
            <Form>
              <FormItem label="File Name" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('File Name', {
                  rules: [{ required: true, message: 'Please input the file name' }],
                })(
                  <Input />
                )}
              </FormItem>
            </Form>
          </div>
        </Modal>
        {/* delete a file */}
        <Modal
          visible={this.props.deleteFileVisible}
          bodyStyle={{
            overflow: 'auto',
          }}
          onCancel={this.props.onCancelDeleteFile}
          onOk={this.props.onDeleteFile}
          title="Delete current file"
          okText="Delete"
          cancelText="Cancel"
        >
          <h4>Do you want to delete current file?</h4>
        </Modal>
      </div>
    )
  }
}       