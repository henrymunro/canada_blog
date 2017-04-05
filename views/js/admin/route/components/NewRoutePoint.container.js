import React from 'react'
import { connect } from 'react-redux'

// Pull in presnentational compontents
import AddNewRoutePointDialog from './AddNewRoutePointDialog'
import AddNewRoutePointForm from './AddNewRoutePointForm'
import { MapComponent, RouteMarker } from '../../../map'

import * as selectors from '../reducer'
import actions from '../actions'

@connect((store) => {
  return {
    newDialogOpen: selectors.getNewRouteDialogOpen(store),
    newRoutePointFormState: selectors.getNewRoutePointFormState(store),
    showNewRoutePointSnackbar: selectors.getShowNewRoutePointSnackBar(store)

  }
}, actions)

export default class NewRoutePoint extends React.Component {

  componentWillMount () {

  }

  componentWillUpdate (nextProps, nextState) {

  }

  saveNewRoutePoint () {
    this.props.saveNewRoutePoint(this.props.newRoutePointFormState)
        .then(() => this.props.getRoute())
  }

  render () {
    const { lat, lng } = this.props.newRoutePointFormState.center
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
          changeHandler={this.props.updateNewRoutePointForm}>
          <MapComponent
            onGoogleApiLoaded={this.props.newRoutePointOnGoogleApiLoaded}
            onChange={this.props.newRoutePointOnMapChange}
            onClick={this.props.newRoutePointOnMapClick}>
            {lat && <RouteMarker lat={lat} lng={lng} name='new' />}
          </MapComponent>
        </AddNewRoutePointForm>
      </AddNewRoutePointDialog>
    </div>
  }
}
