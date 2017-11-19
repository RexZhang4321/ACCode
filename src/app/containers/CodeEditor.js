import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CodeEditor from '../components/CodeEditor'
import { updateFileContent } from '../reducers/editor';

class CodeEditorContainer extends Component {
  static propTypes = {
    content: PropTypes.string
  }

  render() {
    return (
      <CodeEditor
        content={this.props.content}
        onChange={this.props.onChange}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (newValue, e) => {
      dispatch(updateFileContent(newValue, e))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeEditorContainer)