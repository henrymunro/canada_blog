import React from 'react'
import isEqual from 'lodash.isequal'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import {ResizedPhoto} from '../../../photos'

export default class PhotoEditer extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const imageStyle = {
      height: '140px',
      width: 'auto'
    }
    return <div className='row'>
      <div className='col s6 m6 l6'>
        <ResizedPhoto photo={this.props.photo} size='300x200' style={imageStyle} />
      </div>
      <div className='col s6 m6 l6'>
        <TextField
          floatingLabelText='Title'
          value={this.props.photo.name || ''}
          onChange={(e, value) => this.props.onChange({name: value, _id: this.props._id})} />
        <DatePicker
          hintText='Date'
          defaultDate={new Date(this.props.photo.date)}
          onChange={(e, value) => this.props.onChange({date: String(value), _id: this.props._id})} />
      </div>
    </div>
  }
}

PhotoEditer.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  photo: React.PropTypes.object.isRequired,
  _id: React.PropTypes.string.isRequired

}
