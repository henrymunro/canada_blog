import { createActions } from 'redux-actions'
import * as actions from './actionTypes'
import webAPI from '../webAPI'
import { mapActionsCreator } from '../map'

const homeMapActions = mapActionsCreator('HOME')

const homeActions = createActions({
// Sever API
  [actions.GET_BLOG]: () => webAPI.blog.getBlog(),
  [actions.GET_ROUTE]: () => webAPI.route.getRoute()

})

export default Object.assign({}, homeMapActions, homeActions)
