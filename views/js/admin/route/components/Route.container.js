import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

// Pull in presnentational compontents
import NewRoutePoint from './NewRoutePoint.container'
import RouteTable from './RouteTable'
import RouteTableRow from './RouteTableRow'
import { MapComponent, RouteMarker, DayMarker, Svg, BezierMarker } from '../../../map'
import { mapRouteTableRows } from '../model'

import blogEntriesImports, { actions as blogEntriesActions} from '../../blogEntries'

import * as selectors from '../reducer'
import actions from '../actions'

@connect((store) => {
  return {
    route: selectors.getRoutes(store),
    newDialogOpen: selectors.getNewRouteDialogOpen(store),
    // mapState: selectors.getMapState(store),
    newRoutePointFormState: selectors.getNewRoutePointFormState(store),
    showNewRoutePointSnackbar: selectors.getShowNewRoutePointSnackBar(store),
    mapRouteLines: selectors.getMapRouteLines(store),
    blog: blogEntriesImports.selectors.getDayObjects(store),
    hoveredID: selectors.getHoveredID(store),
    routeEdits: selectors.getRouteEdits(store),
    blogEdits: blogEntriesImports.selectors.getDayObjectsEdits(store),
    // Map state
    map: selectors.getRouteMap(store),
    mapLoaded: selectors.getRouteMapLoaded(store),
    zoom: selectors.getRouteMapZoom(store),
    mapBounds: selectors.getRouteMapBounds(store),
    mapDraggable: selectors.getRouteMapDraggable(store)

  }
}, Object.assign({}, actions, blogEntriesActions))

export default class Route extends React.Component {

  componentWillMount () {
    this.props.getRouteAdmin()
    this.props.getAdminBlogEntries()
  }

  editRoutePoint (id, key, value) {
    this.props.editRoutePoint({_id: id, [key]: value})
  }

  plotRoutePoints (route) {
    return route.map((point) => {
      return !point.done && <RouteMarker
        lat={point.center.lat}
        lng={point.center.lng}
        name={point.name}
        hovered={this.props.hoveredID === point._id}
        key={point._id} />
    })
  }

  plotBezierPoints (route) {
    const plotBezier = (bezierKey) => {
      return route.map((point, key) => {
        const hide = point.done || key === 0
        return !hide && <BezierMarker
          lat={point[`bezier${bezierKey}`].lat}
          lng={point[`bezier${bezierKey}`].lng}
          name={String(bezierKey)}
          hovered={this.props.hoveredID === point._id}
          key={`${point._id}_${bezierKey}`} />
      })
    }
    const bezier0 = plotBezier(0)
    const bezier1 = plotBezier(1)
    return [...bezier0, ...bezier1].filter(point => point)
  }

  plotBlogPoints (blog) {
    return blog.map((day, key) => {
      const { lat, lng } = day.center || {}
      return lat && <DayMarker lat={lat} lng={lng} name={day.title} key={day._id} />
    })
  }

  render () {
    const routeTableRows = mapRouteTableRows(this.props.route, RouteTableRow, this.editRoutePoint.bind(this), this.props.deleteRouteEntry, this.props.hoverAdminRoutePoint, this.props.moveRoutePointUpInArray)
    // const markers = this.props.route.map((point) => { return !point.done && <RouteMarker lat={point.center.lat} lng={point.center.lng} name={point.name} key={point._id} hovered={this.props.hoveredID === point._id} /> })

    const { blog, route } = this.props
    const svgLinePoints = [...blog, ...route].map((point) => {
      const { center, bezier0, bezier1 } = point
      return !point.done && { center, bezier0, bezier1 }
    }).filter((point) => point.center)

    return <div>
      <NewRoutePoint />
      <div className='row'>
        <div className='col s6 m6 l6'>
          <RouteTable>
            {routeTableRows}
          </RouteTable>
          {this.props.routeEdits.length > 0 && <RaisedButton label='SAVE' onClick={() => this.props.saveRouteEdits(this.props.routeEdits)} />}
          {this.props.blogEdits.length > 0 && <RaisedButton label='SAVE BLOG' onClick={() => this.props.saveAdminBlogEntryEdits(this.props.blogEdits)} />}
        </div>
        <div className='col s6 m6 l6'>
          <div style={{height: '100vh', width: '500px'}}>
            <MapComponent
              onGoogleApiLoaded={this.props.routeOnGoogleApiLoaded}
              onChange={this.props.routeOnMapChange}
              draggable={this.props.mapDraggable}
              onClick={this.props.routeOnMapClick}
              onChildMouseDown={(childKey, childProps, mouse) => this.props.routeOnMapChildClick({childKey, childProps, mouse, event: 'mouseDown'})}
              onChildMouseUp={(childKey, childProps, mouse) => this.props.routeOnMapChildClick({childKey, childProps, mouse, event: 'mouseUp'})}
              onChildMouseMove={(childKey, childProps, mouse) => this.props.routeOnMapChildClick({childKey, childProps, mouse, event: 'mouseMove'})}
              // onMapLoad={this.props.onRouteAdminMapLoad}
              // mapLoaded={this.props.mapLoaded}
              // onMapLoaded={this.onMapLoaded.bind(this)}
                >
              {this.plotBlogPoints(blog)}
              {this.plotRoutePoints(route)}
              {this.plotBezierPoints([...blog, ...route])}
              {(svgLinePoints.length > 0 && this.props.mapLoaded) && <Svg coords={svgLinePoints} zoom={this.props.zoom} nwCorner={this.props.mapBounds.nw} />}

            </MapComponent>
          </div>
        </div>
      </div>
    </div>
  }
}
              // {markers}
              // {this.props.dayObjects.map((day, key) => {
              //   const { lat, lng } = day.center || {}
              //   return lat && <DayMarker lat={lat} lng={lng} name={day.title} key={day._id} />
              // })
              // }
