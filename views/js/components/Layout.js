import React from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
// import { StickyContainer, Sticky } from 'react-sticky'
// import RaisedButton from 'material-ui/RaisedButton'
// import baseStyles from 'styles/base.css'

const mapStyles = require('styles/googleMapsStyle.json').snazzyMapStyle // https://snazzymaps.com/

import { updateMapCenter, updateMapZoom } from 'js/actions/mapActions'

@connect((store) => {
  return {
    axios: store.axios.axios,
    map: store.map

  }
})

export default class Layout extends React.Component {
  componentWillMount () {

  }

  _onBoundsChange (center, zoom) {
    this.props.dispatch(updateMapCenter(center))
    this.props.dispatch(updateMapZoom(zoom))
  }

  render () {
    const AnyReactComponent = ({name, ...props}) => <div {...props}>{name}</div>
    const { markers, mapDefaults } = this.props.map

    const mappedMarkers = markers.map((element, key) => {
      const { center, name } = element
      return <AnyReactComponent lat={center[0]} lng={center[1]} name={name} key={name} />
    })

    return <div>

      <GoogleMapReact
        style={{height: '500px', width: '500px'}}
        bootstrapURLKeys={{
          key: this.props.map.APIKey
        }}
        defaultCenter={mapDefaults.center}
        defaultZoom={mapDefaults.zoom}
        onBoundsChange={this._onBoundsChange.bind(this)}
        options={{
          styles: mapStyles
        }}>
        {mappedMarkers}
      </GoogleMapReact>
    </div>
  }
}
