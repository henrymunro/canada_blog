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
  [actions.UPDATE_NEW_ROUTE_POINT_FORM]: (key, value, e) => ({[key]: value})
},
  actions.SET_NEW_ROUTE_DIALOG_OPEN,
  actions.HIDE_NEW_ROUTE_POINT_SNACKBAR,
  actions.RESET_NEW_ROUTE_POINT_FORM,
  actions.EDIT_ROUTE_POINT,
  actions.HOVER_ADMIN_ROUTE_POINT,
  actions.MOVE_ROUTE_POINT_UP_IN_ARRAY,
)

export default Object.assign({}, routeMapActions, newRoutePointMapActions, routeActions)
