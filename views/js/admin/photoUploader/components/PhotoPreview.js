import React from 'react'
import isEqual from 'lodash.isequal'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'

export default class PhotoPreview extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    return <div className='row'>
      <div className='col s6 m6 l6'>
        <TextField
          floatingLabelText='Name'
          onChange={(e, value) => this.props.onChange('name', value)}
          value={this.props.name} />
        <TextField
          floatingLabelText='Summary'
          multiLine
          onChange={(e, value) => this.props.onChange('summary', value)}
          value={this.props.summary} />
        <DatePicker
          hintText='Date'
          defaultDate={this.props.date}
          onChange={(e, value) => this.props.onChange('date', value)}
        />
      </div>
      <div className='col s6 m6 l6'>
        {this.props.children}
      </div>
    </div>
  }
}

PhotoPreview.propTypes = {
  name: React.PropTypes.string.isRequired,
  date: React.PropTypes.instanceOf(Date).isRequired,
  summary: React.PropTypes.string
}
