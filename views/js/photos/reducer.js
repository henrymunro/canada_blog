import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { updateObject } from '../reducers/reducerUtilities'
import { mapReducerCreator } from '../map'

const initialState = {
  photos: []
}

const photosReducer = handleActions({
  GET_PHOTOS_FULFILLED: (state, action) => updateObject(state, { photos: action.payload.data })
}, initialState)

const photosMapReducer = mapReducerCreator('PHOTOS')

export default combineReducers({
  photosRoot: photosReducer,
  photosMap: photosMapReducer
})

/*  #############       Selectors     ################   */
export const getPhotos = (state) => (state.photos.photosRoot.photos)

/* ############### Map Selectors ################### */

