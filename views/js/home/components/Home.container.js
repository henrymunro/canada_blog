import React from 'react'
import { connect } from 'react-redux'

// import * as selectors from '../reducer'
import actions from '../actions'

import HomeDrawer from './HomeDrawer'
import HomeMap from './HomeMap.container'
import NavBar from './NavBar'

@connect((store) => {
  return {

  }
}, actions)

export default class Home extends React.Component {

  render () {
    return <div>
      <HomeMap />
      <div className='row'>
        <div className='col s2 m2 l2' style={{padding: 0}}>
          <HomeDrawer />
        </div>
        <div className='col s10 m10 l10' style={{padding: 0}}>
          <NavBar />
        </div>
      </div>
    </div>
  }
}

