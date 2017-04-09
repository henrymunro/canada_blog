import React from 'react'
import { connect } from 'react-redux'

// Pull in presnentational compontents
import AddNewRoutePointDialog from './AddNewRoutePointDialog'
import AddNewRoutePointForm from './AddNewRoutePointForm'
import { MapComponent, RouteMarker, BezierMarker } from '../../../map'

import * as selectors from '../reducer'
import actions from '../actions'

@connect((store) => {
  return {
    newDialogOpen: selectors.getNewRouteDialogOpen(store),
    newRoutePointFormState: selectors.getNewRoutePointFormState(store),
    showNewRoutePointSnackbar: selectors.getShowNewRoutePointSnackBar(store),
    nextRouteNumber: selectors.getNextRouteNumber(store)

  }
}, actions)

export default class NewRoutePoint extends React.Component {

  componentWillMount () {

  }

  componentWillUpdate (nextProps, nextState) {

  }

  saveNewRoutePoint () {
    this.props.saveNewRoutePoint(this.props.newRoutePointFormState)
        .then(() => this.props.getRouteAdmin())
  }

  render () {
    const { lat, lng } = this.props.newRoutePointFormState.center
    const { bezier0, bezier1 } = this.props.newRoutePointFormState
    return <div>
      <AddNewRoutePointDialog
        newDialogOpen={this.props.newDialogOpen}
        setNewRouteDialogOpen={this.props.setNewRouteDialogOpen}
        resetForm={this.props.resetNewRoutePointForm}
        saveNewRoutePoint={this.saveNewRoutePoint.bind(this)}
        showSnackBar={this.props.showNewRoutePointSnackbar}
        hideSnackBar={this.props.hideNewRoutePointSnackbar}
          >
        <AddNewRoutePointForm
          newRoutePointFormState={this.props.newRoutePointFormState}
          nextRouteNumber={this.props.nextRouteNumber}
          changeHandler={this.props.updateNewRoutePointForm}>
          <MapComponent
            onGoogleApiLoaded={this.props.newRoutePointOnGoogleApiLoaded}
            onChange={this.props.newRoutePointOnMapChange}
            onClick={this.props.newRoutePointOnMapClick}>
            {lat && <RouteMarker lat={lat} lng={lng} name='new' />}
            {lat && <BezierMarker lat={bezier0.lat} lng={bezier0.lng} name='0' />}
            {lat && <BezierMarker lat={bezier1.lat} lng={bezier1.lng} name='1' />}
          </MapComponent>
        </AddNewRoutePointForm>
      </AddNewRoutePointDialog>
    </div>
  }
}
