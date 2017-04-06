import React from 'react'
// import isEqual from 'lodash.isequal'

import { latLng2Screen } from '../utilities'

export default class Svg extends React.Component {

  render () {
     // Work out corner of map
    const ptCorner = this.props.ptCorner || latLng2Screen(this.props.nwCorner, this.props.zoom)

     // Work out screen position of points
    const points = this.props.coords.map((point, key) => {
      const ptScreen = latLng2Screen(point, this.props.zoom)
      const pointReturn = {
        x: ptScreen.x - ptCorner.x,
        y: ptScreen.y - ptCorner.y
      }

      return (key === 0 ? 'M' : 'T') + pointReturn.x + ',' + pointReturn.y
    })

    return <svg style={{height: '100vh', width: '100vw', zIndex: '100'}}>
      <path
        d={points.join(' ')}
        fill='none'
        stroke='black'
        strokeWidth='6'
        strokeLinecap='round'
        strokeDasharray='5,10,5' />
    </svg>
  }
}

Svg.propTypes = {
  coords: React.PropTypes.array.isRequired,
  zoom: React.PropTypes.number.isRequired,
  nwCorner: React.PropTypes.object.isRequired

}
