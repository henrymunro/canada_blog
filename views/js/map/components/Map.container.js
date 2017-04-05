import React from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'

const mapStyles = require('styles/googleMapsStyle.json').snazzyMapStyle // https://snazzymaps.com/

import * as selectors from '../reducer'

@connect((store) => {
  return {
    // map: store.map,
    APIKey: selectors.getMapAPIKey(store),
    mapDefaults: selectors.getMapDefaults(store)

  }
})

export default class MapComponent extends React.Component {
  componentWillMount () {

  }

  render () {
    if (this.props.mapLoaded) {
      // this.props.map.Data(google)
      // window.map = this.props.map
      // window.maps = this.props.maps
      // this.props.map.data.addGeoJson(this.props.mapRouteLines)
      // this.props.map.data.setStyle({
      //   fillColor: 'green'
      //   // strokeWeight: 3
      // })
    }

    const { onClick, onChange, onGoogleApiLoaded } = this.props
    return <GoogleMapReact
      bootstrapURLKeys={{
        key: this.props.APIKey
      }}
      defaultCenter={this.props.defaultCenter || this.props.mapDefaults.center}
      defaultZoom={this.props.defaultCenter || this.props.mapDefaults.zoom}
      center={this.props.center}
      onChange={onChange}
      onClick={onClick}
      options={{
        styles: mapStyles
      }}
      onGoogleApiLoaded={onGoogleApiLoaded}
      yesIWantToUseGoogleMapApiInternals>
      {this.props.children}
    </GoogleMapReact>
  }
}

MapComponent.propTypes = {
  onClick: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onGoogleApiLoaded: React.PropTypes.func,
  mapLoaded: React.PropTypes.bool,
  center: React.PropTypes.object
}
