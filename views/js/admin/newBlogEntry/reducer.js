import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { updateObject, addOrUpdateItemInArray, moveElementInArray } from '../../reducers/reducerUtilities'

import { mapReducerCreator } from '../../map'

const defaultFormState = {
  dayNumber: undefined,
  date: new Date(),
  title: undefined,
  center: {lat: undefined, lng: undefined},
  bezier0: {lat: undefined, lng: undefined},
  bezier1: {lat: undefined, lng: undefined},
  summary: undefined,
  distanceKm: '0',
  blog: undefined,
  photos: [],
  budget: []
}

const initialState = {
  formState: defaultFormState,
  showBlog: false,
  showPhotos: false,
  // edit photos dialog
  editedPhotos: [],
  editPhotosDialogOpen: false
}

const newBlogEntryReducer = handleActions({
  UPDATE_NEW_BLOG_ENTRY_FORM: (state, action) => _updateNewBlogEntryForm(state, action),
  TOGGLE_NEW_BLOG_ENTRY_PROP: (state, action) => updateObject(state, action.payload),
  // SAVE_UPLOADED_PHOTOS_FULFILLED: (state, action) => _savedPhotos(state, action),
  UPDATE_UPLOADED_PHOTO_DATABASE_FULFILLED: (state, action) => _savePhoto(state, action),
  MOVE_NEW_BLOG_PHOTO_UP_IN_ARRAY: (state, action) => _moveNewBlogPhotoUpInArray(state, action),
  SAVE_NEW_BLOG_ENTRY_FULFILLED: (state, action) => updateObject(state, initialState),
  // Edit photos dialog
  ON_NEW_BLOG_PHOTO_EDIT: (state, action) => _editPhoto(state, action),
  SAVE_NEW_BLOG_PHOTOS_EDITS: (state, action) => _saveNewPhotosEdits(state, action),
  // Map updates
  NEW_BLOG_ENTRY_ON_MAP_CLICK: (state, action) => _newBlogEntryMapClick(state, action)
}, initialState)

const newBlogEntryMapReducer = mapReducerCreator('NEW_BLOG_ENTRY')

export default combineReducers({
  newBlogEntryRoot: newBlogEntryReducer,
  newBlogEntryMap: newBlogEntryMapReducer
})

/* ####################### REDUCER FUNCTIONS ########################## */
const _updateNewBlogEntryForm = (state, action) => {
  const nextBlogEntryForm = updateObject(state.formState, action.payload)
  return updateObject(state, {formState: nextBlogEntryForm})
}

// const _savedPhotos = (state, action) => {
//   var nextPhotosState = state.formState.photos
//   action.payload.map((photo, key) => {
//     nextPhotosState = addOrUpdateItemInArray(nextPhotosState, photo.databaseInfo._id, photo.databaseInfo)
//   })
//   const nextFormState = updateObject(state.formState, {photos: nextPhotosState})
//   return updateObject(state, { formState: nextFormState })
// }

const _savePhoto = (state, action) => {
  const databaseInfo = action.payload.data.entry
  const nextPhotosState = addOrUpdateItemInArray(state.formState.photos, databaseInfo._id, databaseInfo)
  const nextFormState = updateObject(state.formState, {photos: nextPhotosState})
  return updateObject(state, { formState: nextFormState })
}

const _moveNewBlogPhotoUpInArray = (state, action) => {
  const _id = action.payload._id
  const key = state.formState.photos.findIndex((val) => val._id === _id)
  const nextPhotosState = moveElementInArray(state.formState.photos, _id, key - 1)
  const nextFormState = updateObject(state.formState, {photos: nextPhotosState})
  return updateObject(state, { formState: nextFormState })
}

const _editPhoto = (state, action) => {
  const photos = state.formState.photos
  const editedPhotos = state.editedPhotos
  const _id = action.payload._id
// Checks to see if item already exists in edit array
  const exists = editedPhotos.find(elm => elm._id === _id)
// If item already exists pull out of the edit array and update
  let nextEditedPhotos
  if (exists) {
    nextEditedPhotos = addOrUpdateItemInArray(editedPhotos, _id, action.payload)
  } else {
// else pull out the route element and apply changes
    const photoElement = photos.find(elm => elm._id === _id)
    const editedElement = updateObject(photoElement, action.payload)
    nextEditedPhotos = addOrUpdateItemInArray(editedPhotos, _id, editedElement)
  }
  return updateObject(state, { editedPhotos: nextEditedPhotos })
}

const _saveNewPhotosEdits = (state, action) => {
  const editedPhotos = state.editedPhotos
  const photos = state.formState.photos
  const nextPhotosState = photos.map((photo) => {
    const edit = editedPhotos.filter((editedPhoto) => editedPhoto._id === photo._id)
    return edit.length === 0 ? photo : edit[0]
  })
  const nextFormState = updateObject(state.formState, {photos: nextPhotosState})
  return updateObject(state, { formState: nextFormState, editedPhotos: [], editPhotosDialogOpen: false })
}

const _newBlogEntryMapClick = (state, action) => {
  const { lat, lng } = action.payload
  const center = { lat, lng }
  const bezier0 = {lat: lat + 1, lng: lng - 1}
  const bezier1 = {lat: lat + 2, lng: lng - 2}
  const nextFormState = updateObject(state.formState, {center, bezier0, bezier1})
  return updateObject(state, { formState: nextFormState })
}

/*  #############################   SELECTORS  ############################## */
// general new blog entry state
export const getFormState = state => (state.admin.newBlogEntry.newBlogEntryRoot.formState)
export const getShowBlog = state => (state.admin.newBlogEntry.newBlogEntryRoot.showBlog)
export const getShowPhotos = state => (state.admin.newBlogEntry.newBlogEntryRoot.showPhotos)
export const getSavedPhotos = state => (state.admin.newBlogEntry.newBlogEntryRoot.formState.photos)
// edit photos dialog
export const getEditPhotosDialogOpen = state => (state.admin.newBlogEntry.newBlogEntryRoot.editPhotosDialogOpen)
export const getPhotosToEdit = state => {
  return state.admin.newBlogEntry.newBlogEntryRoot.formState.photos.map((value, key) => {
    const edit = state.admin.newBlogEntry.newBlogEntryRoot.editedPhotos.find(elm => elm._id === value._id)
    return edit || value
  })
}
