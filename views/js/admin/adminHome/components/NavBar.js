import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

export default class NavBar extends React.Component {

  // shouldComponentUpdate (nextProps, nextState) {
  //   return !isEqual(this.props, nextProps)
  // }

  render () {
    return <div style={{position: 'fixed', zIndex: 10, width: '100vw', top: 0}}>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text='Options' />
          <ToolbarSeparator />
          <Link to='/admin/route'><RaisedButton label='Route' primary /></Link>
          <Link to='/admin/newBlogEntry'><RaisedButton label='New blog entry' primary /></Link>
          <Link to='/admin/blogEntries'><RaisedButton label='Blog entries' primary /></Link>
          <Link to='/admin/blog'><RaisedButton label='Blog' primary /></Link>
          <Link to='/admin/home'><RaisedButton label='Home' primary /></Link>
        </ToolbarGroup>
      </Toolbar>
    </div>
  }
}

NavBar.propTypes = {

}
