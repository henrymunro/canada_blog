import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { updateObject } from '../reducers/reducerUtilities'
import mapImports, { mapReducerCreator } from '../map'

const initialState = {
  blog: [],
  route: []
}

const homeReducer = handleActions({
  GET_BLOG_FULFILLED: (state, action) => updateObject(state, { blog: action.payload.data }),
  GET_ROUTE_FULFILLED: (state, action) => updateObject(state, { route: action.payload.data })
}, initialState)

const homeMapReducer = mapReducerCreator('HOME')

export default combineReducers({
  homeRoot: homeReducer,
  homeMap: homeMapReducer
})

/*  #############       Selectors     ################   */
export const getBlog = (state) => (state.blog.blog)
export const getRoute = (state) => (state.home.homeRoot.route)

/* ############### Map Selectors ################### */
export const getMap = (state) => mapImports.selectors.getMap(state.home.homeMap)
export const getMapLoaded = (state) => mapImports.selectors.getMapLoaded(state.home.homeMap)
export const getChildClickCenter = (state) => mapImports.selectors.getChildClickCenter(state.home.homeMap)
