import React from 'react'
import isEqual from 'lodash.isequal'
import TextField from 'material-ui/TextField'
import {RadioButton} from 'material-ui/RadioButton'

export default class AddNewRoutePointForm extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    return <div className='row'>
      <div className='col s6 m6 l6'>
        <div className='row'>
          <div className='col'>
            <TextField floatingLabelText='Number' defaultValue={this.props.nextRouteNumber} onChange={(e, value) => this.props.changeHandler('number', Number(value), e)} />
          </div>
          <div className='col'>
            <TextField floatingLabelText='Name' defaultValue={this.props.newRoutePointFormState.name} onChange={(e, value) => this.props.changeHandler('name', value, e)} />
          </div>
          <RadioButton
            id='newRoutePointFormDone'
            value='done'
            checked={this.props.newRoutePointFormState.done}
            label='done'
            onClick={(e) => this.props.changeHandler('done', !this.props.newRoutePointFormState.done, e)}
/>
        </div>
      </div>
      <div className='col s6 m6 l6' style={{height: '250px'}}>
        {this.props.children}
      </div>
    </div>
  }
}

AddNewRoutePointForm.propTypes = {
  changeHandler: React.PropTypes.func.isRequired,
  newRoutePointFormState: React.PropTypes.shape({
    number: React.PropTypes.number,
    name: React.PropTypes.string,
    center: React.PropTypes.object,
    done: React.PropTypes.bool
  }),
  nextRouteNumber: React.PropTypes.number.isRequired
}
