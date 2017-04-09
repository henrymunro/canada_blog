import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { updateObject, removeElementFromArray, updateOrAddToEditArray, moveElementInArray } from '../../reducers/reducerUtilities'

import mapImports, { mapReducerCreator } from '../../map'
const { turnRoutePointsToLines } = mapImports.utilities

const defaultNewRoutePointFormState = {
  number: 1,
  name: undefined,
  center: {lat: undefined, lng: undefined},
  bezier0: {lat: undefined, lng: undefined},
  bezier1: {lat: undefined, lng: undefined},
  done: false
}

const initialState = {
  route: [],
  routeEdits: [],
  hoveredID: undefined,
  getRoutePending: false,
  newDialogOpen: false,
  newRoutePointFormState: defaultNewRoutePointFormState,
  saveNewRoutePointPending: false,
  showNewRoutePointSnackBar: false
}

const routeReducer = handleActions({
// Get data
  GET_ROUTE_ADMIN_PENDING: (state, action) => updateObject(state, { getRoutePending: true }),
  GET_ROUTE_ADMIN_FULFILLED: (state, action) => updateObject(state, { route: action.payload.data, getRoutePending: false }),
// Edit data
  EDIT_ROUTE_POINT: (state, action) => _editRoutePoint(state, action),
  DELETE_ROUTE_ENTRY_FULFILLED: (state, action) => _deleteRouteEntry(state, action),
  MOVE_ROUTE_POINT_UP_IN_ARRAY: (state, action) => _moveRoutePointUpInArray(state, action),
// Adding a new route point
  SET_NEW_ROUTE_DIALOG_OPEN: (state, action) => updateObject(state, {newDialogOpen: action.payload}),
  UPDATE_NEW_ROUTE_POINT_FORM: (state, action) => _updateNewRoutePointFormState(state, action),
  RESET_NEW_ROUTE_POINT_FORM: (state, action) => updateObject(state, {newRoutePointFormState: defaultNewRoutePointFormState}),
  SAVE_NEW_ROUTE_POINT_PENDING: (state, action) => updateObject(state, {saveNewRoutePointPending: true}),
  SAVE_NEW_ROUTE_POINT_FULFILLED: (state, action) => _saveNewRoutePointFulfilled(state, action),
  HIDE_NEW_ROUTE_POINT_SNACKBAR: (state, action) => updateObject(state, {showNewRoutePointSnackBar: false}),
  NEW_ROUTE_POINT_ON_MAP_CLICK: (state, action) => _newRoutePointMapClick(state, action),
// Other
  HOVER_ADMIN_ROUTE_POINT: (state, action) => updateObject(state, {hoveredID: action.payload}),
// Map changes
  ROUTE_ON_MAP_CHILD_CLICK: (state, action) => _routeOnMapChildClick(state, action)
}, initialState)

const routeMapReducer = mapReducerCreator('ROUTE')
const newRoutePointMapReducer = mapReducerCreator('NEW_ROUTE_POINT')

export default combineReducers({
  routeRoot: routeReducer,
  routeMap: routeMapReducer,
  newRoutePointMap: newRoutePointMapReducer
})

// Reducer functions
const _deleteRouteEntry = (state, action) => {
  const nextRouteState = [...state.route]
  const nextRouteEditsState = [...state.routeEdits]
  const _id = action.payload.data.entry._id
  return updateObject(state, {
    route: removeElementFromArray(nextRouteState, _id),
    routeEdits: removeElementFromArray(nextRouteEditsState, _id)
  })
}

// const updateNewMapState = (state, action) => {
//   const nextRoutePointFormState = updateObject(state.newRoutePointFormState, {center: action.payload.center})
//   return updateObject(state, {mapState: action.payload, newRoutePointFormState: nextRoutePointFormState})
// }
const _updateNewRoutePointFormState = (state, action) => {
  const nextRoutePointFormState = updateObject(state.newRoutePointFormState, action.payload)
  return updateObject(state, {newRoutePointFormState: nextRoutePointFormState})
}

const _saveNewRoutePointFulfilled = (state, action) => {
  return updateObject(state, {
    newDialogOpen: false,
    saveNewRoutePointPending: false,
    showNewRoutePointSnackBar: true,
    newRoutePointFormState: defaultNewRoutePointFormState
  })
}

const _editRoutePoint = (state, action) => {
  const { route, routeEdits } = state
  const nextRouteEdits = updateOrAddToEditArray(route, routeEdits, action.payload)
  return updateObject(state, { routeEdits: nextRouteEdits })
}

const _newRoutePointMapClick = (state, action) => {
  const { lat, lng } = action.payload
  const newCenter = {lat, lng}
  const bezier0 = {lat: lat + 1, lng: lng - 1}
  const bezier1 = {lat: lat + 2, lng: lng - 2}
  const nextNewRoutePointFormState = updateObject(state.newRoutePointFormState, { center: newCenter, bezier0, bezier1 })
  return updateObject(state, {newRoutePointFormState: nextNewRoutePointFormState})
}

const _moveRoutePointUpInArray = (state, action) => {
  const { _id, up } = action.payload
  const key = state.route.findIndex((val) => val._id === _id)
  const routeStateAdjusted = moveElementInArray(state.route, _id, up ? key - 1 : key + 1)
  const nextRouteState = routeStateAdjusted.map((value, key) => Object.assign({}, value, {number: key}))
  return updateObject(state, { route: nextRouteState, routeEdits: nextRouteState })
}

// Handles the drag and drop function for the route points and their bezier points
const _routeOnMapChildClick = (state, action) => {
  const { _id, type, mouse, move } = action.payload
  const { lat, lng } = mouse
  if (!move || !(type === 'route' || type === 'bezier')) {
    return state
  }
  // deal with route center updates
  let nextRouteEditState
  if (type === 'route') {
    const updates = {_id, center: { lat, lng }}
    nextRouteEditState = updateOrAddToEditArray(state.route, state.routeEdits, updates)
  }
  // deal with bezier updates
  if (type === 'bezier') {
    // pull out which of the two bezier points has been clicked (passed in the ID field as _0 or _1)
    const bezierNo = _id.substr(-1)
    // Trim down ID of passed bezier number
    const actualId = _id.slice(0, -2)
    const updates = {_id: actualId, [`bezier${bezierNo}`]: { lat, lng }}
    nextRouteEditState = updateOrAddToEditArray(state.route, state.routeEdits, updates)
  }

  return updateObject(state, { routeEdits: nextRouteEditState })
}

// Selectors
export const getRoutes = state => {
  const { route, routeEdits } = state.admin.route.routeRoot
  return route.map((value, key) => {
    const edit = routeEdits.find(elm => elm._id === value._id)
    return edit || value
  })
}

export const getRouteEdits = state => (state.admin.route.routeRoot.routeEdits)

export const getNextRouteNumber = state => (getRoutes(state).length)

export const getHoveredID = state => (state.admin.route.routeRoot.hoveredID)

export const getNewRouteDialogOpen = state => (state.admin.route.routeRoot.newDialogOpen)

export const getNewRoutePointFormState = state => (state.admin.route.routeRoot.newRoutePointFormState)

export const getShowNewRoutePointSnackBar = state => (state.admin.route.routeRoot.showNewRoutePointSnackBar)

// Returns geoJSON formate of all the route lines
export const getMapRouteLines = (state) => {
  const markers = getRoutes(state)
  // find the difference between two neigbouring route points
  return turnRoutePointsToLines(markers)
}

/* ######################## MAP SELECTORS ############################ */
// Route Map
export const getRouteMapLoaded = state => mapImports.selectors.getMapLoaded(state.admin.route.routeMap)
export const getRouteMap = state => mapImports.selectors.getMap(state.admin.route.routeMap)
export const getRouteMapZoom = state => mapImports.selectors.getZoom(state.admin.route.routeMap)
export const getRouteMapBounds = state => mapImports.selectors.getBounds(state.admin.route.routeMap)
export const getRouteMapDraggable = state => mapImports.selectors.getDraggable(state.admin.route.routeMap)

// New Route Point Map
