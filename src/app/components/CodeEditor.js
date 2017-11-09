import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor';
import { Menu, Icon } from 'antd'

export default class Editor extends Component {
  static propTypes = {
    content: PropTypes.string
  }

  render() {
    return (
      <div>
        <Menu theme="light" mode="horizontal" style={{ lineHeight: '32px' }}>
          <Menu.Item key="1">File 1</Menu.Item>
          <Menu.Item key="2">File 2</Menu.Item>
          <Menu.Item key="3">File 3</Menu.Item>
        </Menu>
        <MonacoEditor
          width="100%"
          height="550"
          language="java"
          theme="vs"
          value={this.props.content}
        />
      </div>
    )
  }

}