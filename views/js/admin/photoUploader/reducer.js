import { handleActions } from 'redux-actions'
import { updateObject, updateItemInArray } from '../../reducers/reducerUtilities'

const initialState = {
  uploadPhotosPending: false,
  uploadPhotoDialogOpen: false,
  uploadedPhotos: []
}

export default handleActions({
  UPLOAD_NEW_BLOG_PHOTOS_FULFILLED: (state, action) => _uploadNewBlogPhotos(state, action),
  UPDATE_UPLOADED_PHOTO: (state, action) => _updateUploadedPhoto(state, action),
  CANCEL_PHOTO_UPLOAD: (state, action) => updateObject(state, initialState),
  UPDATE_PHOTO_UPLOADER_PROP: (state, action) => updateObject(state, action.payload),
  SAVE_UPLOADED_PHOTOS_FULFILLED: (state, action) => updateObject(state, initialState)

}, initialState)

const _uploadNewBlogPhotos = (state, action) => {
  return updateObject(state, {uploadedPhotos: action.payload, uploadPhotosPending: false})
}

const _updateUploadedPhoto = (state, action) => {
  const photos = state.uploadedPhotos
  console.log('UPDATING PHOTO: ', photos, action.payload)
  const nextPhotosState = updateItemInArray(photos, action.payload._id, photo => {
    return updateObject(photo, action.payload)
  })
  return updateObject(state, { uploadedPhotos: nextPhotosState })
}

// Selectors
export const getUploadedPhotos = state => (state.admin.photoUploader.uploadedPhotos)
export const getUploadPhotosPending = state => (state.admin.photoUploader.uploadPhotosPending)
export const getUploadPhotoDialogOpen = state => (state.admin.photoUploader.uploadPhotoDialogOpen)

export const getUploadingCount = state => {
  const uploadedPhotos = state.admin.photoUploader.uploadedPhotos
  return uploadedPhotos.filter(photo => photo.uploading).length
}
export const getUploadedCount = state => {
  const uploadedPhotos = state.admin.photoUploader.uploadedPhotos
  return uploadedPhotos.filter(photo => photo.uploaded).length
}
export const getUploadingErrorCount = state => {
  const uploadedPhotos = state.admin.photoUploader.uploadedPhotos
  return uploadedPhotos.filter(photo => photo.error).length
}
