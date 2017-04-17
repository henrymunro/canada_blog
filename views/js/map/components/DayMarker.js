import React from 'react'
import isEqual from 'lodash.isequal'

import mapStyles from 'styles/components/map.css'

export default class DayMarker extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const K_WIDTH = 30
    const K_HEIGHT = 30
    const pinStyle = {
// initially any map object has left top corner at lat lng coordinates
// it's on you to set object origin to 0,0 coordinates
      top: -(1 + 1.41) * K_HEIGHT / 2,
      left: -K_WIDTH / 2,
      position: 'absolute',
      width: K_WIDTH,
      height: K_HEIGHT,
      borderRadius: '50% 50% 50% 0',
      background: '#89849b'
      // margin: '-20px 0 0 -20px',

      // border: '5px solid green',
      // borderRadius: K_HEIGHT,
      // backgroundColor: 'white',
      // textAlign: 'center',
      // color: '#3f51b5',
      // fontSize: 16,
      // fontWeight: 'bold',
      // padding: 4
    }

    const pinMiddleStyle = {
      // top: -3 * K_HEIGHT / 2,
      // left: -0.2 * K_WIDTH,
      top: -(1 + 1.41) * K_HEIGHT / 2,
      left: -K_WIDTH / 2,
      content: '',
      width: K_HEIGHT / 2,
      height: K_HEIGHT / 2,
      margin: '8px 0 0 8px',
      background: '#2f2f2f',
      position: 'absolute',
      borderRadius: '50%'
    }

    return <div>
      <div
        className={mapStyles.dayMarker}
        style={pinStyle}
        onClick={this.props.onClick} />
      <div
        className={mapStyles.dayMarker}
        onClick={this.props.onClick}
        style={pinMiddleStyle} />
    </div>
  }
}
      // {this.props.name}

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
