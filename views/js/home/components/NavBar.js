import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

export default class NavBar extends React.Component {

  // shouldComponentUpdate (nextProps, nextState) {
  //   return !isEqual(this.props, nextProps)
  // }

  render () {
    return <div style={{position: 'relative'}}>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text='Options' />
          <ToolbarSeparator />
          <Link to='/blog'><RaisedButton label='Blogg' primary /></Link>
          <Link to='/home'><RaisedButton label='Home' primary /></Link>
        </ToolbarGroup>
      </Toolbar>
    </div>
  }
}

NavBar.propTypes = {

}
