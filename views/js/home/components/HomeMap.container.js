import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../reducer'
import actions from '../actions'

import {MapComponent, RouteMarker, DayMarker, DayMarkerOverview, Svg, Path} from '../../map'

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
    selectedBlogId: selectors.getSelectedBlogId(store)
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
    const { blog, route } = this.props

    const svgLineBlogPoints = this.getPathArray(blog)

    console.log('OADAUHS: ', svgLineBlogPoints, (svgLineBlogPoints.length > 0 && this.props.mapLoaded))

    const svgLineRoutePoints = this.getPathArray([blog[blog.length - 1], ...route])

    // console.log('SVG POINT: ', svgLinePoints)
    return <div>
      <div style={{height: '100vh', width: '100vw', position: 'fixed'}}>
        <MapComponent
          center={this.props.mapCenter}
          draggable={this.props.mapDraggable}
          onChange={this.props.homeOnMapChange}
          onClick={this.props.homeOnMapClick}
          onGoogleApiLoaded={this.props.homeOnGoogleApiLoaded} >
          {this.plotBlogPoints(this.props.blog)}
          {this.plotRoutePoints(this.props.route)}
          <Svg>
            {(svgLineRoutePoints.length > 0 && this.props.mapLoaded) && <Path route coords={svgLineRoutePoints} zoom={this.props.zoom} nwCorner={this.props.mapBounds.nw} />}
            {(svgLineBlogPoints.length > 0 && this.props.mapLoaded) && <Path coords={svgLineBlogPoints} zoom={this.props.zoom} nwCorner={this.props.mapBounds.nw} />}
          </Svg>
        </MapComponent>
        <div style={divStyle} >
          <h4>Here</h4>
        </div>
      </div>
      {this.props.children}
    </div>
  }
}

