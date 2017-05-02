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
      <div className='row' style={{background: color.theme100}}>
        <div className='col s12 m12 l12'>
          Sign up for weekly email updates:
        </div>
        <div className='col s9 m9 l9'>
          <TextField
            hintText='Email Address'
            fullWidth />
        </div>
        <div className='col s3 m3 l3'>
          <FlatButton
            label='Sign up' />
        </div>
      </div>
    </div>
  }
}

EmailSignUp.propTypes = {

}
