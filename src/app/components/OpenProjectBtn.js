import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Input } from 'antd'
const FormItem = Form.Item

export default class OpenProjectBtn extends Component {

  static propTypes = {
    form: PropTypes.object,
    onOpenProject: PropTypes.func,
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
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
        <Button size={'large'} onClick={this.props.onOpenProject}>Open</Button>
        <Modal
          visible={this.props.visible}
          bodyStyle={{
            overflow: 'auto',
          }}
          onCancel={this.props.onCancel}
          onOk={this.handleSubmit}
          title="Open a project"
          okText="Open"
          cancelText="Cancel"
        >
          <div ref="dialogContent">
            <Form>
              <FormItem label="Project Name" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('Project Name', {
                  rules: [{ required: true, message: 'Please input your project name' }],
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