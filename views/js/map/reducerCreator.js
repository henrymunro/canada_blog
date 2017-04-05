import { handleActions } from 'redux-actions'
import { updateObject } from '../reducers/reducerUtilities'
import * as utilities from './utilities'

const initialState = {
  map: undefined,
  maps: undefined,
  mapLoaded: false,
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
  // On chilc click events
  childClickCenter: undefined
}

export default (nameSpace = '') => {
  return handleActions({
    [`${nameSpace}_ON_MAP_CHANGE`]: (state, action) => updateObject(state, action.payload),
    [`${nameSpace}_ON_GOOGLE_API_LOADED`]: (state, action) => updateObject(state, action.payload),
    [`${nameSpace}_ON_MAP_CLICK`]: (state, action) => updateObject(state, { clickDetails: action.payload }),
    [`${nameSpace}_ON_MAP_CHILD_CLICK`]: (state, action) => updateObject(state, { childClickCenter: action.payload })

  }, initialState)
}

// Selectors
export const getMapLoaded = (state) => (state.mapLoaded)

export const getMap = (state) => (state.map)

export const getMaps = (state) => (state.maps)

export const getClickDetails = (state) => (state.clickDetails)

export const getChildClickCenter = (state) => (state.childClickCenter)

// Returns geoJSON formate of all the route lines
export const getMapRouteLines = (state) => {
  const markers = state.markers
  // find the difference between two neigbouring route points
  return utilities.turnRoutePointsToLines(markers)
}
