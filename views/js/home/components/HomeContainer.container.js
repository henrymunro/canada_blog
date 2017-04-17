import React from 'react'
import { connect } from 'react-redux'

// import * as selectors from '../reducer'
import actions from '../actions'

import NavBar from './NavBar'

@connect((store, ownProps) => {
  return {
    currentRoute: ownProps.location.pathname
  }
}, actions)

export default class HomeContainer extends React.Component {

  componentWillMount () {
    this.props.getBlog()
    this.props.getRoute()
  }

  render () {
    return <div>
      <NavBar currentRoute={this.props.currentRoute} />
      {this.props.children}
    </div>
  }
}

