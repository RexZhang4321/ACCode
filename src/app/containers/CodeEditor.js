import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CodeEditor from '../components/CodeEditor'

class CodeEditorContainer extends Component {
  static propTypes = {
    content: PropTypes.string
  }

  render() {
    return (
      <CodeEditor
        content={this.props.content}
      />
    )
  }

}

const mapStateToProps = (state) => {
  const { editorReducer } = state
  const { content } = editorReducer || { content: "" }

  return {
    content
  }
}

export default connect(
  mapStateToProps
)(CodeEditorContainer)