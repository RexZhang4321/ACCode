import React, { Component } from 'react'
import CodeEditor from './CodeEditor'
import Explorer from './Explorer'
import OutputWindow from '../components/OutputWindow'
import Toolbar from './Toolbar'
import { Row, Col } from 'antd';

class ACCodeApp extends Component {

  render() {
    return (
      <div>
        <Row>
          <Toolbar />
        </Row>
        <Row>
          <Col span={4}><Explorer /></Col>
          <Col span={20}>
            <Row><CodeEditor /></Row>
            <Row><OutputWindow /></Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ACCodeApp