import React from 'react'

export default class HomeDrawer extends React.Component {
  render () {
    const drawerStyle = {
      width: '100%',
      height: '100vh',
      overflowY: 'scroll',
      background: 'rgba(0,0,0,0.9)',
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
