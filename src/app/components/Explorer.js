import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Form } from 'antd'
import * as defs from '../utils/defs'
import FileCtlBtn from '../containers/FileCtlBtn'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Explorer extends Component {
  static propTypes = {
    appName: PropTypes.string,
    projectDir: PropTypes.object,
    isFetching: PropTypes.bool,
    onLoadEditorContent: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.loadEditorContent = this.loadEditorContent.bind(this)
  }

  loadEditorContent(item, key, keyPath) {
    this.props.onLoadEditorContent(this.props.appName, item.key)
  }

  renderDirData(data, curDir) {
    if (data.type === defs.FOLDER_T) {
      return (
        <SubMenu key={data.name} title={<span><Icon type={defs.FOLDER_T} /><span>{data.name}</span></span>}>
          {data.children.map((obj, i) => {
            return this.renderDirData(obj, curDir + data.name + '/')
          })}
        </SubMenu>
      )
    } else if (data.type === defs.FILE_T) {
      return (
        <Menu.Item key={curDir + data.name}>
          <Icon type={defs.FILE_T}/>{data.name}
        </Menu.Item>
      )
    }
  }

  renderData(dirData) {
    const WrappedFileCtlBtn = Form.create()(FileCtlBtn);
    if (!dirData.children) return ( <div> <WrappedFileCtlBtn/> <Menu mode="inline"/> </div>)
    return (
      <div>
        <WrappedFileCtlBtn/>
        <Menu
          mode="inline"
          onClick={this.loadEditorContent}
        >
          {dirData.children.map((obj, i) => {
            return this.renderDirData(obj, '/')
          })}
        </Menu>
      </div>
    )
  }

  render() {
    return (
      this.renderData(this.props.projectDir)
    )
  }

}