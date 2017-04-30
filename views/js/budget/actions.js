import { createActions } from 'redux-actions'
import * as actions from './actionTypes'
import webAPI from '../webAPI'
import { mapActionsCreator } from '../map'

const budgetMapActions = mapActionsCreator('BUDGET')

const budgetActions = createActions({
// Sever API
  [actions.GET_BUDGET]: () => webAPI.budget.getBudget()

})

export default Object.assign({}, budgetMapActions, budgetActions)
