import React from 'react'
import isEqual from 'lodash.isequal'
import color from 'styles/color'

import mapStyles from 'styles/components/map.css'

export default class DayMarkerOverview extends React.Component {

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
      borderRadius: '0% 100% 0% 0',
      background: color.theme800,
      filter: 'alpha(opacity=90)',
      opacity: 0.9
    }

    const BOX_WIDTH = 300
    const BOX_HEIGHT = 160

    const boxStyle = {
      top: -BOX_HEIGHT - (1 * K_HEIGHT / 2),
      left: -BOX_WIDTH / 2,
      padding: '8px',
      content: '',
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
      background: color.theme500,
      position: 'absolute',
      zIndex: 10,
      borderRadius: '4px',
      border: '1px solid ' + color.theme800,

      color: color.theme50,
      filter: 'alpha(opacity=90)',
      opacity: 0.9
    }

    return <div>
      <div
        className={mapStyles.dayMarker}
        style={pinStyle}
        onClick={this.props.onClick} />
      <div
        className={mapStyles.bounce}
        style={boxStyle}>
        <h5>{this.props.name}</h5>
      </div>
    </div>
  }
}
      // {this.props.name}

DayMarkerOverview.defaultProps = {
  type: 'blog'
}

DayMarkerOverview.propTypes = {
  name: React.PropTypes.string.isRequired,
  lat: React.PropTypes.number.isRequired,
  lng: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func,
  type: React.PropTypes.string

}
