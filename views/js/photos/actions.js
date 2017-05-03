import { createActions } from 'redux-actions'
import * as actions from './actionTypes'
import webAPI from '../webAPI'
import { mapActionsCreator } from '../map'

const photosMapActions = mapActionsCreator('PHOTOS')

const photosActions = createActions({
// Sever API
  [actions.GET_PHOTOS]: () => webAPI.photos.getPhotos()
// Client requests

},
actions.REMOVE_PHOTO_ON_LOAD_ERROR,
actions.PHOTO_ON_MOUSE_ENTER,
actions.PHOTO_ON_CLICK
)

export default Object.assign({}, photosMapActions, photosActions)
