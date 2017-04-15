import React from 'react'

export default class Svg extends React.Component {

  render () {
    return <svg style={{height: '100vh', width: '100vw', zIndex: '100'}}>
      {this.props.children}
    </svg>
  }
}

Svg.propTypes = {
}
