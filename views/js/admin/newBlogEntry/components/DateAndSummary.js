import React from 'react'
import isEqual from 'lodash.isequal'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'

export default class DateAndSummary extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    return <div className='row'>
      <div className='col s3 m3 l3'>
        <DatePicker
          hintText='Date'
          defaultDate={this.props.date}
          onChange={(e, value) => this.props.onChange('date', value)}
        />
        <TextField
          floatingLabelText='Distance (km)'
          value={this.props.distanceKm}
          errorText={Number(this.props.distanceKm) || !this.props.distanceKm ? '' : 'Enter a number'}
          onChange={(e, value) => this.props.onChange('distanceKm', value)} />
      </div>
      <div className='col s9 m9 l9'>
        <TextField
          floatingLabelText='Summary'
          multiLine
          rows={4}
          fullWidth
          value={this.props.summary ? this.props.summary : ''}
          onChange={(e, value) => this.props.onChange('summary', value)} />
      </div>
    </div>
  }
}

DateAndSummary.propTypes = {
  date: React.PropTypes.instanceOf(Date).isRequired,
  distanceKm: React.PropTypes.string,
  summary: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
}
