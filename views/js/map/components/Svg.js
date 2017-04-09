import React from 'react'
// import isEqual from 'lodash.isequal'

import { latLng2Screen } from '../utilities'

export default class Svg extends React.Component {

  pointToScreen (point, ptCorner, zoom) {
    const ptScreen = latLng2Screen(point, zoom)
    return {
      x: ptScreen.x - ptCorner.x,
      y: ptScreen.y - ptCorner.y
    }
  }

  render () {
     // Work out corner of map
    const ptCorner = this.props.ptCorner || latLng2Screen(this.props.nwCorner, this.props.zoom)

     // Work out screen position of points
    const points = this.props.coords.map((point, key) => {
      // const ptScreen = latLng2Screen(point, this.props.zoom)
      const pointReturn = this.pointToScreen(point.center, ptCorner, this.props.zoom)

      const bezier0 = this.pointToScreen(point.bezier0, ptCorner, this.props.zoom)
      const bezier1 = this.pointToScreen(point.bezier1, ptCorner, this.props.zoom)

      // Translate points to SVG path notation
      const pointPlot = pointReturn.x + ',' + pointReturn.y
      const bezier0Plot = bezier0.x + ',' + bezier0.y
      const bezier1Plot = bezier1.x + ',' + bezier1.y
      const bezierPlot = key === 0 ? '' : bezier0Plot + ' ' + bezier1Plot + ' '

      return (key === 0 ? 'M' : 'C') + bezierPlot + pointPlot
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
