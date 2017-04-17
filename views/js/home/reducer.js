import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { updateObject } from '../reducers/reducerUtilities'
import mapImports, { mapReducerCreator } from '../map'

const initialState = {
  blog: [],
  route: [],
  selectedBlogId: undefined
}

const homeReducer = handleActions({
  GET_BLOG_FULFILLED: (state, action) => updateObject(state, { blog: action.payload.data }),
  GET_ROUTE_FULFILLED: (state, action) => updateObject(state, { route: action.payload.data }),
  HOME_ON_MAP_SPECIFIC_CHILD_CLICK: (state, action) => updateObject(state, { selectedBlogId: action.payload._id })
}, initialState)

const homeMapReducer = mapReducerCreator('HOME')

export default combineReducers({
  homeRoot: homeReducer,
  homeMap: homeMapReducer
})

/*  #############       Selectors     ################   */
export const getBlog = (state) => (state.blog.blog)
export const getRoute = (state) => (state.home.homeRoot.route)
export const getSelectedBlogId = (state) => (state.home.homeRoot.selectedBlogId)

/* ############### Map Selectors ################### */
export const getMap = (state) => mapImports.selectors.getMap(state.home.homeMap)
export const getMapLoaded = (state) => mapImports.selectors.getMapLoaded(state.home.homeMap)
export const getMapDraggable = (state) => mapImports.selectors.getDraggable(state.home.homeMap)
export const getChildClickCenter = (state) => mapImports.selectors.getChildClickCenter(state.home.homeMap)
export const getZoom = (state) => mapImports.selectors.getZoom(state.home.homeMap)
export const getMapBounds = (state) => mapImports.selectors.getBounds(state.home.homeMap)
