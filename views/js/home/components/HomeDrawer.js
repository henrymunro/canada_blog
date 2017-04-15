import React from 'react'

export default class HomeDrawer extends React.Component {
  render () {
    return <div style={{width: '100%', height: '100vh', overflowY: 'scroll', background: 'rgba(0,0,0,0.7)', position: 'relative'}}>
      {this.props.children}
    </div>
  }
}

HomeDrawer.propTypes = {

}
