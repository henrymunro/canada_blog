import React from 'react'
import isEqual from 'lodash.isequal'

export default class BezierMarker extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  getPointStyle (scale = 1) {
    const K_WIDTH = 10
    const K_HEIGHT = 10
    return {
// initially any map object has left top corner at lat lng coordinates
// it's on you to set object origin to 0,0 coordinates
      position: 'absolute',
      width: K_WIDTH * scale,
      height: K_HEIGHT * scale,
      left: -K_WIDTH * scale / 2,
      top: -K_HEIGHT * scale / 2,

      border: '1px solid #f44336',
      borderRadius: K_HEIGHT * scale,
      backgroundColor: 'black',
      textAlign: 'center',
      color: '#3f51b5',
      fontSize: 16,
      fontWeight: 'bold',
      padding: 4
    }
  }

  render () {
    const style = this.props.hovered ? this.getPointStyle(1.5) : this.getPointStyle(1)

    return <div style={style}>{this.props.name}</div>
  }
}

BezierMarker.defaultProps = {
  type: 'bezier'
}

BezierMarker.propTypes = {
  lat: React.PropTypes.number.isRequired,
  lng: React.PropTypes.number.isRequired,
  hovered: React.PropTypes.bool,
  type: React.PropTypes.string,
  name: React.PropTypes.string
}
