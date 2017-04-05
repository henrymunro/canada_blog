import { createActions } from 'redux-actions'
import * as actions from './actionTypes'

export default (nameSpace = '') => {
  return createActions({
    [`${nameSpace}_${actions.ON_GOOGLE_API_LOADED}`]: ({map, maps}) => ({map, maps, mapLoaded: true}),
    [`${nameSpace}_${actions.ON_MAP_CHANGE}`]: ({center, bounds, marginBounds, size, zoom, ...other}) => ({center, bounds, marginBounds, size, zoom}),
    [`${nameSpace}_${actions.ON_MAP_CLICK}`]: ({lat, lng, x, y, ...other}) => ({lat, lng, x, y}),
    [`${nameSpace}_${actions.ON_MAP_CHILD_CLICK}`]: (value) => (value)
  })
}
