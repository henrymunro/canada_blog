import React from 'react'
import isEqual from 'lodash.isequal'
import color from 'styles/color'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export default class EmailSignUp extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    return <div>
      <div className='row'>
        <div className='col s12 m12 l12'>
          Sign up for weekly email updates:
        </div>
        <div className='col s12 m12 l12'>
          <p style={{fontSize: 'small', paddingLeft: '5px', paddingRight: '5px'}}>
            I promise not to be annoying and you can unsubscribe at any time!
          </p>
        </div>
        <div className='col s6 m12 l6'>
          <TextField
            inputStyle={{color: color.theme50}}
            hintStyle={{color: color.theme600}}
            onChange={(e, val) => this.props.onChange({firstName: val})}
            hintText='First name'
            fullWidth />
        </div>
        <div className='col s6 m12 l6'>
          <TextField
            inputStyle={{color: color.theme50}}
            hintStyle={{color: color.theme600}}
            onChange={(e, val) => this.props.onChange({lastName: val})}
            hintText='Last name'
            fullWidth />
        </div>
        <div className='col s12 m12 l12'>
          <TextField
            hintText='Email Address'
            inputStyle={{color: color.theme50}}
            hintStyle={{color: color.theme600}}
            onChange={(e, val) => this.props.onChange({email: val})}
            fullWidth />
        </div>
        <div className='col s12 m12 l12' style={{marginTop: '10px'}}>
          <FlatButton
            backgroundColor={color.theme300}
            onClick={this.props.onSave}
            label='Sign up' />
        </div>
      </div>
    </div>
  }
}

EmailSignUp.propTypes = {
  onChange: React.PropTypes.func,
  onSave: React.PropTypes.func

}
