import { createActions } from 'redux-actions'
import * as actions from './actionTypes'

export default (nameSpace = '') => {
  return createActions({
    [`${nameSpace}_${actions.ON_GOOGLE_API_LOADED}`]: ({map, maps}) => ({map, maps, mapLoaded: true}),
    [`${nameSpace}_${actions.ON_MAP_CHANGE}`]: ({center, bounds, marginBounds, size, zoom, ...other}) => ({center, bounds, marginBounds, size, zoom}),
    [`${nameSpace}_${actions.ON_MAP_CLICK}`]: ({lat, lng, x, y, ...other}) => ({lat, lng, x, y}),
    [`${nameSpace}_${actions.ON_MAP_CHILD_CLICK}`]: ({...input}) => _onMapChildClick({...input}),
    [`${nameSpace}_${actions.ON_MAP_SPECIFIC_CHILD_CLICK}`]: (value) => (value)
  })
}

const _onMapChildClick = ({...input}) => {
  console.log(input)
  const { childKey, childProps, mouse, event } = input
  const payload = { _id: childKey, type: childProps.type, mouse, move: event === 'mouseMove' }
  switch (event) {
    case 'mouseUp':
      return Object.assign({}, payload, {draggable: true})

    case 'mouseDown':
      return Object.assign({}, payload, {draggable: false})

    case 'mouseMove':
      return Object.assign({}, payload, {draggable: false})

    default:
      return payload
  }
}
