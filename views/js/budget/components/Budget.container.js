import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../reducer'
import actions from '../actions'

import {NavBar} from '../../home'

@connect((store, ownProps) => {
  return {
    currentRoute: ownProps.location.pathname,
    budget: selectors.getBudget(store)
  }
}, actions)

export default class Budget extends React.Component {

  componentWillMount () {
  }

  render () {
    return <div>
      <NavBar currentRoute={this.props.currentRoute} width='100%' />
      <h1>Budget</h1>
    </div>
  }
}
