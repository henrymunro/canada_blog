import { createActions } from 'redux-actions'
import * as actions from './actionTypes'
import webAPI from '../../webAPI'
import { mapActionsCreator } from '../../map'

const routeMapActions = mapActionsCreator('ROUTE')
const newRoutePointMapActions = mapActionsCreator('NEW_ROUTE_POINT')

const routeActions = createActions({
  // Sever API
  [actions.GET_ROUTE_ADMIN]: () => webAPI.routeAdmin.getRoutes(),
  [actions.SAVE_NEW_ROUTE_POINT]: (routePoint) => webAPI.routeAdmin.saveNewRoutePoint(routePoint),
  [actions.DELETE_ROUTE_ENTRY]: (_id) => webAPI.routeAdmin.deleteRouteEntry(_id),
  [actions.SAVE_ROUTE_EDITS]: (edits) => webAPI.routeAdmin.saveRouteEdits(edits),
  // CLient changes
  [actions.ON_ROUTE_MAP_CHANGE]: ({center, zoom, bounds, ...other}) => ({center, zoom, bounds, other}),
  [actions.UPDATE_NEW_ROUTE_POINT_FORM]: (key, value, e) => ({[key]: value})
},
  actions.SET_NEW_ROUTE_DIALOG_OPEN,
  actions.HIDE_NEW_ROUTE_POINT_SNACKBAR,
  actions.RESET_NEW_ROUTE_POINT_FORM,
  actions.EDIT_ROUTE_POINT,
  actions.ON_ROUTE_ADMIN_MAP_LOAD,
  actions.HOVER_ADMIN_ROUTE_POINT,
)

export default Object.assign({}, routeMapActions, newRoutePointMapActions, routeActions)
