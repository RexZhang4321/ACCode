import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Tabs, Icon, Input } from 'antd'

const { TextArea } = Input;
const TabPane = Tabs.TabPane;

export default class OutputWindow extends Component {
  static propTypes = {
    buildLog: PropTypes.array,
    lastBuildLogTimestamp: PropTypes.number,
    appLog: PropTypes.string,
    lastAppLogTimestamp: PropTypes.number
  }

  componentDidUpdate() {
    const buildLogEle = ReactDOM.findDOMNode(this.buildLogEle)
    buildLogEle.scrollTop = buildLogEle.scrollHeight
    const appLogEle = ReactDOM.findDOMNode(this.appLogEle)
    if (appLogEle != null && appLogEle != undefined) {
      console.log(appLogEle)
      appLogEle.scrollTop = appLogEle.scrollHeight      
    }
  }

  stringifyLog(logArr) {
    return logArr.map(event => event.message).join('')
  }

  render() {
    return (
      <div>
        <Tabs type="card">
          <TabPane tab="Build Log" key="1">
            <TextArea
              rows={10}
              readOnly
              style={{marginTop: -16}}
              value={this.stringifyLog(this.props.buildLog)}
              ref={(el) => this.buildLogEle = el}/>
          </TabPane>
          <TabPane tab="App Log" key="2">
            <TextArea
              rows={10}
              readOnly
              style={{marginTop: -16}}
              value={this.props.appLog}
              ref={(el) => this.appLogEle = el}/>
          </TabPane>
        </Tabs>
      </div>
    )
  }

}