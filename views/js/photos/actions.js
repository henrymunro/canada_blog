import { createActions } from 'redux-actions'
import * as actions from './actionTypes'
import webAPI from '../webAPI'
import { mapActionsCreator } from '../map'

const photosMapActions = mapActionsCreator('PHOTOS')

const photosActions = createActions({
// Sever API
  [actions.GET_PHOTOS]: () => webAPI.photos.getPhotos()

})

export default Object.assign({}, photosMapActions, photosActions)
