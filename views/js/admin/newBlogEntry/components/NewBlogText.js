import React from 'react'
import isEqual from 'lodash.isequal'
import TextField from 'material-ui/TextField'

export default class NewBlogText extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const newLine = /\r\n|[\n\r\u0085\u2028\u2029]/g
    return <div className='row'>
      <div className='col s12 m12 l12'>
        <TextField
          floatingLabelText='Blog'
          multiLine
          rows={5}
          fullWidth
          defaultValue={this.props.blog && this.props.blog.join('\n')}
          onChange={(e, value) => this.props.onChange('blog', value.split(newLine))} />
      </div>
    </div>
  }
}

NewBlogText.propTypes = {
  blog: React.PropTypes.array,
  onChange: React.PropTypes.func.isRequired
}
