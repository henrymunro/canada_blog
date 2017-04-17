import { handleActions } from 'redux-actions'
import { updateObject } from '../reducers/reducerUtilities'
import * as utilities from './utilities'

const initialState = {
  map: undefined,
  maps: undefined,
  mapLoaded: false,
  draggable: true,
  // On change event
  bounds: {},
  center: {},
  marginBounds: {},
  size: {},
  zoom: 6,
  // On map click event
  clickDetails: {
    lat: undefined,
    lng: undefined,
    x: undefined,
    y: undefined
  },
  // On specific child click events
  childClickCenter: undefined
  // On child click

}

export default (nameSpace = '') => {
  return handleActions({
    [`${nameSpace}_ON_MAP_CHANGE`]: (state, action) => updateObject(state, action.payload),
    [`${nameSpace}_ON_GOOGLE_API_LOADED`]: (state, action) => updateObject(state, action.payload),
    [`${nameSpace}_ON_MAP_CLICK`]: (state, action) => updateObject(state, { clickDetails: action.payload }),
    [`${nameSpace}_ON_MAP_CHILD_CLICK`]: (state, action) => updateObject(state, { draggable: action.payload.draggable }),
    [`${nameSpace}_ON_MAP_SPECIFIC_CHILD_CLICK`]: (state, action) => _onSpecificChildClick(state, action)

  }, initialState)
}

const _onSpecificChildClick = (state, action) => {
  const { lat, lng } = action.payload
  return updateObject(state, {childClickCenter: {lat, lng}})
}

// Selectors
export const getMapLoaded = (state) => (state.mapLoaded)
export const getMap = (state) => (state.map)
export const getMaps = (state) => (state.maps)
export const getDraggable = (state) => (state.draggable)
export const getZoom = (state) => (state.zoom)
export const getBounds = (state) => (state.bounds)
export const getClickDetails = (state) => (state.clickDetails)
export const getChildClickCenter = (state) => (state.childClickCenter)

// Returns geoJSON formate of all the route lines
export const getMapRouteLines = (state) => {
  const markers = state.markers
  // find the difference between two neigbouring route points
  return utilities.turnRoutePointsToLines(markers)
}
