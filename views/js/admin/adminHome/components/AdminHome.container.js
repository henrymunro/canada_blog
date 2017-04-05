import React from 'react'
import { connect } from 'react-redux'

// Pull in presnentational compontents
import NavBar from './NavBar.js'

@connect((store) => {
  return {

  }
})

export default class AdminHome extends React.Component {
  componentWillMount () {

  }

  render () {
    return <div>
      <NavBar />
      {this.props.children}
    </div>
  }
}

