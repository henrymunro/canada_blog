import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../reducer'
import actions from '../actions'

import {NavBar} from '../../home'

@connect((store, ownProps) => {
  return {
    currentRoute: ownProps.location.pathname,
    aboutMe: selectors.getAboutMe(store)
  }
}, actions)

export default class AboutMe extends React.Component {

  componentWillMount () {

  }

  render () {
    return <div>
      <NavBar currentRoute={this.props.currentRoute} width='100%' />
      <h1>About Me</h1>
    </div>
  }
}
