import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Icon, Input } from 'antd'

const { TextArea } = Input;
const TabPane = Tabs.TabPane;

export default class OutputWindow extends Component {
  
  render() {
    return (
      <div>
        <Tabs type="card">
          <TabPane tab="Build Log" key="1">
            <TextArea
              rows={4}
              readOnly
              style={{marginTop: -16}}
              defaultValue='Build log will be displayed here&#10;,&#10;,&#13;,&#10;,&#10;...'/>
          </TabPane>
          <TabPane tab="Running Log" key="2">
            <TextArea
              rows={4}
              readOnly
              style={{marginTop: -16}}
              defaultValue='Application running log will be displayed here'/>
          </TabPane>
        </Tabs>
      </div>
    )
  }

}