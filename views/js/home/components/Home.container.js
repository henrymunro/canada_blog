import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../reducer'
import actions from '../actions'

import BlogThumb from './BlogThumb'
import HomeDrawer from './HomeDrawer'
import HomeMap from './HomeMap.container'
import NavBar from './NavBar'

@connect((store, ownProps) => {
  return {
    blog: selectors.getBlog(store),
    currentRoute: ownProps.location.pathname
  }
}, actions)

export default class Home extends React.Component {

  componentWillMount () {
    this.props.getBlog()
    this.props.getRoute()
  }

  render () {
    const navBarWidth = Number(window.innerWidth) >= 992 ? '84%' : '75%'

    const {blog} = this.props
    return <div>
      <HomeMap />
      <div className='row' style={{marginBottom: 0}}>
        <div className='col s3 m3 l2' style={{padding: 0}} >
          <HomeDrawer>
            {blog.length > 0 && [...blog].reverse().map((entry, key) => entry.photos[0] && <BlogThumb blog={entry} key={entry._id} />)}
          </HomeDrawer>
        </div>
        <div className='col s9 m9 l10' style={{padding: 0}}>
          <NavBar currentRoute={this.props.currentRoute} width={navBarWidth} />
        </div>
      </div>
    </div>
  }
}
