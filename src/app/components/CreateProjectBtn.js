import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Input } from 'antd'
const FormItem = Form.Item

export default class CreateProjectBtn extends Component {

  static propTypes = {
    visible: PropTypes.bool,
    isCreating: PropTypes.bool,
    form: PropTypes.object,
    openWizard: PropTypes.func,
    onCancel: PropTypes.func,
    onOk: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.onOk(this.props.form)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button size={'large'} onClick={this.props.openWizard}>Create</Button>
        <Modal
          visible={this.props.visible}
          confirmLoading={this.props.isCreating}
          bodyStyle={{
            height: 180,
            overflow: 'auto',
          }}
          onCancel={this.props.onCancel}
          onOk={this.handleSubmit}
          title="Create a new project"
          okText="Create"
          cancelText="Cancel"
        >
          <div ref="dialogContent">
            <Form>
              <FormItem label="Package Name" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('Package Name', {
                  rules: [{ required: true, message: 'Please input your package name' },
                          { validator: this.props.checkPackageName,}],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="Project Name" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('Project Name', {
                  rules: [{ required: true, message: 'Please input your project name' }],
                })(
                  <Input />
                )}
              </FormItem>

              <FormItem label="Description" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('Description', {
                  rules: [{ required: false, message: 'Please input the description of your project' }],
                })(
                  <Input />
                )}
              </FormItem>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}