import React from 'react'

export default class HomeDrawer extends React.Component {
  render () {
    return <div style={{width: '100%', height: '100vh', background: 'rgba(0,0,0,0.4)', position: 'relative'}} />
  }
}

HomeDrawer.propTypes = {
  open: React.PropTypes.bool

}
