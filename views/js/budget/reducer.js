import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { updateObject } from '../reducers/reducerUtilities'
import { mapReducerCreator } from '../map'

const initialState = {
  budget: []
}

const budgetReducer = handleActions({
  GET_BUDGET_FULFILLED: (state, action) => updateObject(state, { budget: action.payload.data })
}, initialState)

const budgetMapReducer = mapReducerCreator('BUDGET')

export default combineReducers({
  budgetRoot: budgetReducer,
  budgetMap: budgetMapReducer
})

/*  #############       Selectors     ################   */
export const getBudget = (state) => (state.budget.budgetRoot.budget)

/* ############### Map Selectors ################### */

