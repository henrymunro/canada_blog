import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

// Pull in presnentational compontents
import NewRoutePoint from './NewRoutePoint.container'
import RouteTable from './RouteTable'
import RouteTableRow from './RouteTableRow'
import { MapComponent, RouteMarker, DayMarker } from '../../../map'
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
    map: selectors.getRouteMap(store),
    mapLoaded: selectors.getRouteMapLoaded(store),
    dayObjects: blogEntriesImports.selectors.getDayObjects(store),
    hoveredID: selectors.getHoveredID(store),
    routeEdits: selectors.getRouteEdits(store)

  }
}, Object.assign({}, actions, blogEntriesActions))

export default class Route extends React.Component {

  componentWillMount () {
    this.props.getRouteAdmin()
    this.props.getAdminBlogEntries()
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.mapLoaded && !this.props.mapLoaded) {
      this.onMapLoaded(nextProps.map, nextProps.mapRouteLines)
    }
  }

  editRoutePoint (id, key, value) {
    this.props.editRoutePoint({_id: id, [key]: value})
  }

  onMapLoaded (map, mapRouteLines) {
    map.data.forEach((feature) => {
      map.data.remove(feature)
    })
    map.data.addGeoJson(mapRouteLines)
  }

  render () {
    const routeTableRows = mapRouteTableRows(this.props.route, RouteTableRow, this.editRoutePoint.bind(this), this.props.deleteRouteEntry, this.props.hoverAdminRoutePoint)
    const markers = this.props.route.map((point) => { return !point.done && <RouteMarker lat={point.center.lat} lng={point.center.lng} name={point.name} key={point._id} hovered={this.props.hoveredID === point._id} /> })

    return <div>
      <NewRoutePoint />
      <div className='row'>
        <div className='col s6 m6 l6'>
          <RouteTable>
            {routeTableRows}
          </RouteTable>
          {this.props.routeEdits.length > 0 && <RaisedButton label='SAVE' onClick={() => this.props.saveRouteEdits(this.props.routeEdits)} />}
        </div>
        <div className='col s6 m6 l6'>
          <div style={{height: '100vh', width: '500px'}}>
            <MapComponent
              onGoogleApiLoaded={this.props.routeOnGoogleApiLoaded}
              onChange={this.props.routeOnMapChange}
              onClick={this.props.routeOnMapClick}
              // onMapLoad={this.props.onRouteAdminMapLoad}
              // mapLoaded={this.props.mapLoaded}
              // onMapLoaded={this.onMapLoaded.bind(this)}
                >
              {markers}
              {this.props.dayObjects.map((day, key) => {
                const { lat, lng } = day.center || {}
                return lat && <DayMarker lat={lat} lng={lng} name={day.title} key={day._id} />
              })
              }
            </MapComponent>
          </div>
        </div>
      </div>
    </div>
  }
}
