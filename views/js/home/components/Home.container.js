import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../reducer'
import actions from '../actions'

import {MapComponent, RouteMarker, DayMarker} from '../../map'

@connect((store) => {
  return {
    map: selectors.getMap(store),
    mapLoaded: selectors.getMapLoaded(store),
    blog: selectors.getBlog(store),
    route: selectors.getRoute(store),
    mapCenter: selectors.getChildClickCenter(store)
  }
}, actions)

export default class Home extends React.Component {
  componentWillMount () {
    this.props.getBlog()
    this.props.getRoute()
  }

  plotRoutePoints (route) {
    return route.map((point) => {
      return <RouteMarker
        lat={point.center.lat}
        lng={point.center.lng}
        name={point.name}
        key={point._id} />
    })
  }

  plotBlogPoints (blog) {
    return blog.map((day, key) => {
      const { lat, lng } = day.center || {}
      return lat && <DayMarker lat={lat} lng={lng} name={day.title} key={day._id} onClick={() => this.props.homeOnMapChildClick({lat, lng})} />
    })
  }

  render () {
    const divStyle = {
      height: '200px',
      width: '200px',
      marginTop: '50px',
      background: 'white',
      position: 'absolute',
      top: 0,
      right: 0
    }
    return <div style={{height: '100vh', width: '100vw'}}>
      <MapComponent
        center={this.props.mapCenter}
        onGoogleApiLoaded={this.props.homeOnGoogleApiLoaded} >
        {this.plotBlogPoints(this.props.blog)}
        {this.plotRoutePoints(this.props.route)}
      </MapComponent>
      <div style={divStyle}>
        <h4>Here</h4>
      </div>
    </div>
  }
}

