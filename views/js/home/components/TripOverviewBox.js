import React from 'react'

export default class TripOverviewBox extends React.Component {

  render () {
    const divStyle = {
      height: '123px',
      width: '220px',
      background: 'white',
      position: 'absolute',
      bottom: 0,
      right: 0,
      paddingTop: '5px',
      paddingLeft: '30px',
      paddingRight: '30px'
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
