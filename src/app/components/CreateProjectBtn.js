import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Input } from 'antd'
const FormItem = Form.Item

export default class CreateProjectBtn extends Component {

    static propTypes = {
        visible: PropTypes.bool,
        openWizard: PropTypes.func,
        onCancel: PropTypes.func,
        onOk: PropTypes.func
    }

    render(){
        return (
            <div>
                <Button size={'large'} onClick={ this.props.openWizard }>Create</Button>
                <Modal
                    visible={ this.props.visible }
                    bodyStyle={{
                        height: 130,
                        overflow: 'auto',
                    }}
                    onCancel={ this.props.onCancel }
                    onOk={ this.props.onOk }
                    title="Create a new project"
                    okText="Create" 
                    cancelText="Cancel"
                >
                    <div ref="dialogContent">
                        <Form>
                            <FormItem label="Project Name" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                                <Input
                                
                                />
                            </FormItem>

                            <FormItem label="Description" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                                <Input
                                
                                />
                            </FormItem>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}