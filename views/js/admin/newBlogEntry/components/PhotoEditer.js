import React from 'react'
import isEqual from 'lodash.isequal'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'

export default class PhotoEditer extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    return <div className='row'>
      <div className='col s6 m6 l6'>
        <img style={{height: '140px', width: 'auto'}} src={this.props.url} />
      </div>
      <div className='col s6 m6 l6'>
        <TextField
          floatingLabelText='Title'
          value={this.props.name ? this.props.name : ''}
          onChange={(e, value) => this.props.onChange({name: value, _id: this.props._id})} />
        <DatePicker
          hintText='Date'
          defaultDate={new Date(this.props.date)}
          onChange={(e, value) => this.props.onChange({date: String(value), _id: this.props._id})} />
      </div>
    </div>
  }
}

PhotoEditer.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  _id: React.PropTypes.string.isRequired

}
