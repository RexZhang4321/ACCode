import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CodeEditor from './CodeEditor'
import Explorer from './Explorer'
import OutputWindow from '../components/OutputWindow'
import Toolbar from './Toolbar'
import { finishBuildProject } from '../reducers/toolbar'
import { Row, Col } from 'antd';

class ACCodeApp extends Component {

  static propTypes = {
    finishBuildProject: PropTypes.func
  }

  componentWillMount() {
    this._initServerSideEvent()
  }

  _initServerSideEvent() {
    const url = 'http://localhost:5000/subscribeServer?project=' + 'test-android-hello'
    const source = new EventSource(url)
    source.onmessage = (e) => {
      const response = JSON.parse(e.data)
      switch (response.action) {
        case 'build-finished':
          this.props.finishBuildProject()
        default:
          console.log('no matching event!')
      }
    }
  }

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

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    finishBuildProject: () => {
      dispatch(finishBuildProject())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ACCodeApp)