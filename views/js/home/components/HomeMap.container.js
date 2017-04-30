import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../reducer'
import actions from '../actions'

import {MapComponent, RouteMarker, DayMarker, DayMarkerOverview, Svg, Path} from '../../map'
import TripOverviewBox from './TripOverviewBox'

@connect((store) => {
  return {
    map: selectors.getMap(store),
    mapLoaded: selectors.getMapLoaded(store),
    mapDraggable: selectors.getMapDraggable(store),
    zoom: selectors.getZoom(store),
    mapBounds: selectors.getMapBounds(store),
    blog: selectors.getBlog(store),
    route: selectors.getRoute(store),
    mapCenter: selectors.getChildClickCenter(store),
    selectedBlogId: selectors.getSelectedBlogId(store),
    // Trip overview box
    currentDay: selectors.getCurrentDay(store),
    totalDistance: selectors.getTotalDistance(store),
    totalSpending: selectors.getTotalSpending(store)
  }
}, actions)

export default class HomeMapContainer extends React.Component {

  plotRoutePoints (route) {
    return route.map((point) => {
      const { lat, lng } = point.center || {}
      return lat && <RouteMarker
        lat={lat}
        lng={lng}
        name={point.name}
        key={point._id} />
    })
  }

  plotBlogPoints (blog) {
    return blog.map((day, key) => {
      const { lat, lng } = day.center || {}
      // Check to see if the blog entry has been currently selected
      if (day._id === this.props.selectedBlogId) {
        // If so return the detailed day overview
        return lat && <DayMarkerOverview lat={lat} lng={lng} name={day.title} key={day._id} onClick={() => this.props.homeOnMapSpecificChildClick({lat, lng, _id: day._id})} />
      }
      // Else return a map pin
      return lat && <DayMarker lat={lat} lng={lng} key={day._id} onClick={() => this.props.homeOnMapSpecificChildClick({lat, lng, _id: day._id})} />
    })
  }

  getPathArray (array) {
    return array.map(point => {
      const { center, bezier0, bezier1 } = point || {}
      return { center, bezier0, bezier1 }
    }).filter((point) => point.center)
  }

  onMapLoad ({...props}) {
    this.props.homeOnGoogleApiLoaded({...props})
    const blog = this.props.blog
    if (blog.length > 0) {
      const { center, _id } = blog[blog.length - 1]
      this.props.homeOnMapSpecificChildClick({lat: center.lat, lng: center.lng, _id})
    }
  }

  render () {
    const { blog, route } = this.props
    const svgLineBlogPoints = this.getPathArray(blog)
    const svgLineRoutePoints = this.getPathArray([blog[blog.length - 1], ...route])

    console.log('THIS IS THE CURRENT DAY!!: ', this.props.currentDay)

    return <div>
      <div style={{height: '100vh', width: '100vw', position: 'fixed'}}>
        <MapComponent
          center={this.props.mapCenter}
          draggable={this.props.mapDraggable}
          onChange={this.props.homeOnMapChange}
          onClick={this.props.homeOnMapClick}
          onGoogleApiLoaded={this.onMapLoad.bind(this)} >
          {this.plotBlogPoints(this.props.blog)}
          {this.plotRoutePoints(this.props.route)}
          <Svg>
            {(svgLineRoutePoints.length > 0 && this.props.mapLoaded) && <Path route coords={svgLineRoutePoints} zoom={this.props.zoom} nwCorner={this.props.mapBounds.nw} />}
            {(svgLineBlogPoints.length > 0 && this.props.mapLoaded) && <Path coords={svgLineBlogPoints} zoom={this.props.zoom} nwCorner={this.props.mapBounds.nw} />}
          </Svg>
        </MapComponent>
        <TripOverviewBox
          currentDay={this.props.currentDay}
          totalDistance={this.props.totalDistance}
          totalSpending={this.props.totalSpending}
        />
      </div>
      {this.props.children}
    </div>
  }
}

