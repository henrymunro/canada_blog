import React from 'react'
import color from 'styles/color'

export default class TripOverviewBox extends React.Component {

  render () {
    const divStyle = {
      height: '123px',
      width: '220px',
      background: color.theme300,
      color: color.theme900,
      position: 'absolute',
      bottom: 0,
      right: 0,
      paddingTop: '5px',
      paddingLeft: '30px',
      paddingRight: '30px',
      borderLeft: '2px solid ' + color.theme500,
      borderTop: '2px solid ' + color.theme500,
      borderTopLeftRadius: '7px'
    }

    return <div style={divStyle} >
      <h5>Trip overview</h5>
          currentDay: {this.props.currentDay}
      <br />
          totalDistance: {this.props.totalDistance}km
          <br />
          totalSpending: ${this.props.totalSpending}
    </div>
  }
}

TripOverviewBox.propTypes = {
  currentDay: React.PropTypes.number.isRequired,
  totalDistance: React.PropTypes.number.isRequired,
  totalSpending: React.PropTypes.number.isRequired
}
