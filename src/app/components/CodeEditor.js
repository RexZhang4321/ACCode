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
        <MonacoEditor
          width="100%"
          height="550"
          language="java"
          theme="vs"
          value={this.props.content}
          onChange={this.props.onChange}
        />
      </div>
    )
  }

}
