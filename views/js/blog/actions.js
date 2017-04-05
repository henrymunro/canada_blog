import { createActions } from 'redux-actions'
import * as actions from './actionTypes'
import webAPI from '../webAPI'

export default createActions({
// Sever API
  [actions.GET_BLOG]: () => webAPI.blog.getBlog()

// CLient changes

})
