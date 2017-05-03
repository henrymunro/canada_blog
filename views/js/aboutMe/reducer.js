import { handleActions } from 'redux-actions'
import { updateObject } from '../reducers/reducerUtilities'

const initialState = {
  aboutMe: [],
  emailSignUpFrom: {},
  emailSignedUp: false
}

export default handleActions({
// Web api requests
  GET_ABOUT_ME: (state, action) => updateObject(state, { aboutMe: action.payload.data }),

// client requests
  UPDATE_EMAIL_SIGN_UP_FORM: (state, action) => _updateEmailSignUpForm(state, action)
}, initialState)

const _updateEmailSignUpForm = (state, action) => {
  const emailSignUpFrom = state.emailSignUpFrom
  const nextEmailSignUpFromState = updateObject(emailSignUpFrom, action.payload)
  return updateObject(state, {emailSignUpFrom: nextEmailSignUpFromState})
}

/*  #############       Selectors     ################   */
export const getAboutMe = (state) => (state.aboutMe.aboutMe)
export const getEmailSignUpForm = (state) => (state.aboutMe.emailSignUpFrom)
export const getEmailSignedUp = (state) => (state) => (state.aboutMe.emailSignedUp)
