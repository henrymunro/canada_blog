import { createActions } from 'redux-actions'
import * as actions from './actionTypes'
import webAPI from '../webAPI'

const aboutMeActions = createActions({
// Sever API
  [actions.GET_ABOUT_ME]: () => webAPI.aboutMe.getAboutMe()

})

export default Object.assign({}, aboutMeActions)
