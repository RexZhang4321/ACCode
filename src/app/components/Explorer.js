import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import * as defs from '../utils/defs'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Explorer extends Component {
  static propTypes = {
    projectDir: PropTypes.object,
    isFetching: PropTypes.bool,
    onLoadEditorContent: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.loadEditorContent = this.loadEditorContent.bind(this)
  }

  loadEditorContent(item, key, keyPath) {
    this.props.onLoadEditorContent(item.key)
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
    if (!dirData.children) return (<Menu mode="inline"/>)
    return (
      <Menu
        mode="inline"
        onClick={this.loadEditorContent}
      >
        {dirData.children.map((obj, i) => {
          return this.renderDirData(obj, '/')
        })}
      </Menu>
    )
  }

  render() {
    return (
      this.renderData(this.props.projectDir)
    )
  }

}