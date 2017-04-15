import React from 'react'
import { connect } from 'react-redux'

// import * as selectors from '../reducer'
import actions from '../actions'

import NavBar from './NavBar'

@connect((store) => {
  return {

  }
}, actions)

export default class HomeContainer extends React.Component {

  componentWillMount () {
    this.props.getBlog()
    this.props.getRoute()
  }

  render () {
    return <div>
      <NavBar />
      {this.props.children}
    </div>
  }
}

