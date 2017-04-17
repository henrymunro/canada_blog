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
  HOME_ON_MAP_SPECIFIC_CHILD_CLICK: (state, action) => updateObject(state, { selectedBlogId: action.payload._id }),
  HOME_ON_MAP_CLICK: (state, action) => updateObject(state, {selectedBlogId: undefined})
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

export const getCurrentDay = (state) => {
  const blog = state.blog.blog
  return !(blog.length > 0) ? 0 : blog.reduce((prev, curr) => (prev.dayNumber < curr.dayNumber ? prev.dayNumber : curr.dayNumber))
}

export const getTotalDistance = (state) => {
  const blog = state.blog.blog
  return !(blog.length > 0) ? 0 : blog.reduce((acc, value) => (acc + value.distanceKm), 0)
}

export const getTotalSpending = (state) => {
  const blog = state.blog.blog
  return !(blog.length > 0) ? 0 : blog.reduce((acc, value) => {
// Work out total for each budget type
    const daySpending = !(value.budget.length > 0) ? 0 : value.budget.reduce((acc, item) => (acc + item.total), 0)
    return acc + daySpending
  }, 0)
}

/* ############### Map Selectors ################### */
export const getMap = (state) => mapImports.selectors.getMap(state.home.homeMap)
export const getMapLoaded = (state) => mapImports.selectors.getMapLoaded(state.home.homeMap)
export const getMapDraggable = (state) => mapImports.selectors.getDraggable(state.home.homeMap)
export const getChildClickCenter = (state) => mapImports.selectors.getChildClickCenter(state.home.homeMap)
export const getZoom = (state) => mapImports.selectors.getZoom(state.home.homeMap)
export const getMapBounds = (state) => mapImports.selectors.getBounds(state.home.homeMap)
