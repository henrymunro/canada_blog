import React from 'react'
import color from 'styles/color'

export default class HomeDrawer extends React.Component {
  render () {
    const drawerStyle = {
      width: '100%',
      height: '100vh',
      overflowY: 'scroll',
      background: color.themeBackground,
      position: 'relative',
      padding: '10px'
    }

    return <div style={drawerStyle}>
      {this.props.children}
    </div>
  }
}

HomeDrawer.propTypes = {

}
