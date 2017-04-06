import React from 'react'
import isEqual from 'lodash.isequal'

export default class DayMarker extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const K_WIDTH = 40
    const K_HEIGHT = 40
    const greatPlaceStyle = {
// initially any map object has left top corner at lat lng coordinates
// it's on you to set object origin to 0,0 coordinates
      position: 'absolute',
      width: K_WIDTH,
      height: K_HEIGHT,
      left: -K_WIDTH / 2,
      top: -K_HEIGHT / 2,

      border: '5px solid green',
      borderRadius: K_HEIGHT,
      backgroundColor: 'white',
      textAlign: 'center',
      color: '#3f51b5',
      fontSize: 16,
      fontWeight: 'bold',
      padding: 4
    }

    return <div
      style={greatPlaceStyle}
      onClick={this.props.onClick}>
      {this.props.name}
    </div>
  }
}

DayMarker.defaultProps = {
  type: 'blog'
}

DayMarker.propTypes = {
  name: React.PropTypes.string.isRequired,
  lat: React.PropTypes.number.isRequired,
  lng: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func,
  type: React.PropTypes.string

}
