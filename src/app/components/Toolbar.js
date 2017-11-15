import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Button, Form } from 'antd'
import CreateProjectBtn from '../containers/CreateProjectBtn'


export default class Toolbar extends Component {
  static propTypes = {
    isBuilding: PropTypes.bool,
    onBuildProject: PropTypes.func,
    onOpenEmulator: PropTypes.func
  }

  render() {
    const WrappedBtn = Form.create()(CreateProjectBtn);
    return (
      <div>
        <Menu theme="light" mode="horizontal" style={{ lineHeight: '64px' }} selectable={false}>
          <Menu.Item key="5"><WrappedBtn /> </Menu.Item>
          <Menu.Item key="1"><Button size={'large'}>Save</Button></Menu.Item>
          <Menu.Item key="2"><Button size={'large'} loading={this.props.isBuilding} onClick={this.props.onBuildProject}>Build</Button></Menu.Item>
          <Menu.Item key="3"><Button size={'large'}>Run</Button></Menu.Item>
          <Menu.Item key="4"><Button size={'large'} onClick={this.props.onOpenEmulator}>Emulator</Button></Menu.Item>
        </Menu>
      </div>
    )
  }

}