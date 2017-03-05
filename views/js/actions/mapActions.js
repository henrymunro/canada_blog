import * as types from '../constants/ActionTypes'

/** *********     UPDATE MAP PROPERTIES ******************/
export function updateMapCenter (center) {
  return {
    type: types.UPDATE_MAP_CENTER,
    payload: center
  }
}

export function updateMapZoom (zoom) {
  return {
    type: types.UPDATE_MAP_ZOOM,
    payload: zoom
  }
}
