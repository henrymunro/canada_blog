import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../reducer'
import actions from '../actions'

import {NavBar} from '../../home'

@connect((store, ownProps) => {
  return {
    photos: selectors.getPhotos(store),
    currentRoute: ownProps.location.pathname
  }
}, actions)

export default class Photos extends React.Component {

  componentWillMount () {
    this.props.getPhotos()
  }

  render () {
    return <div>
      <NavBar currentRoute={this.props.currentRoute} width='100%' />
      <h1>Photos</h1>
    </div>
  }
}
