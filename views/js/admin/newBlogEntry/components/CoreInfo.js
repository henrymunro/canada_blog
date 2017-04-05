import React from 'react'
import isEqual from 'lodash.isequal'
import TextField from 'material-ui/TextField'
import {RadioButton} from 'material-ui/RadioButton'

export default class CoreInfo extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    return <div className='row'>
      <div className='col s4 m4 l4'>
        <TextField
          floatingLabelText='Day Number'
          defaultValue={this.props.dayNumber}
          errorText={Number(this.props.dayNumber) || !this.props.dayNumber ? '' : 'Enter a number'}
          onChange={(e, value) => this.props.onChange('dayNumber', value)} />
      </div>
      <div className='col s4 m4 l4'>
        <TextField
          floatingLabelText='Title'
          value={this.props.title ? this.props.title : ''}
          onChange={(e, value) => this.props.onChange('title', value)} />
      </div>
      <div className='col  s4 m4 l4'>
        <RadioButton
          checked={this.props.showBlog}
          onClick={() => this.props.toggleProp('showBlog', !this.props.showBlog)}
          label='blog'
      />
        <RadioButton
          checked={this.props.showPhotos}
          onClick={() => this.props.toggleProp('showPhotos', !this.props.showPhotos)}
          label='photos'
      />
      </div>
    </div>
  }
}

CoreInfo.propTypes = {
  dayNumber: React.PropTypes.string,
  title: React.PropTypes.string,
  showBlog: React.PropTypes.bool.isRequired,
  showPhotos: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  toggleProp: React.PropTypes.func.isRequired
}
