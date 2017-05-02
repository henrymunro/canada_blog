import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { updateObject, removeElementFromArray, updateItemInArray } from '../reducers/reducerUtilities'
import { mapReducerCreator } from '../map'

const initialState = {
  photos: []
}

const photosReducer = handleActions({
  GET_PHOTOS_FULFILLED: (state, action) => updateObject(state, { photos: action.payload.data }),
  REMOVE_PHOTO_ON_LOAD_ERROR: (state, action) => _removePhotoOnLoadError(state, action)
}, initialState)

const photosMapReducer = mapReducerCreator('PHOTOS')

export default combineReducers({
  photosRoot: photosReducer,
  photosMap: photosMapReducer
})

const _removePhotoOnLoadError = (state, action) => {
  const { blogId, _id } = action.payload
  const photos = state.photos
  const blog = Object.assign({}, photos.filter(day => day._id === blogId)[0])
  const nextBlogPhotosState = removeElementFromArray(blog.photos, _id)
  const nextPhotosState = updateItemInArray(photos, blogId, (item) => {
    return updateObject(item, {photos: nextBlogPhotosState})
  })
  return updateObject(state, {photos: nextPhotosState})
}

/*  #############       Selectors     ################   */
export const getPhotos = (state) => (state.photos.photosRoot.photos)

/* ############### Map Selectors ################### */

