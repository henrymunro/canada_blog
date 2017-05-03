import { createActions } from 'redux-actions'
import * as actions from './actionTypes'
import webAPI from '../webAPI'

const aboutMeActions = createActions({
// Sever API
  [actions.GET_ABOUT_ME]: () => webAPI.aboutMe.getAboutMe(),
  [actions.SEND_EMAIL_SIGN_UP]: ({firstName, lastName, email}) => webAPI.emailSignUp.postEmailSignUp({firstName, lastName, email})

},
actions.UPDATE_EMAIL_SIGN_UP_FORM
)

export default Object.assign({}, aboutMeActions)
