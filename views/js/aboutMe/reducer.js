import { handleActions } from 'redux-actions'
import { updateObject } from '../reducers/reducerUtilities'

const initialState = {
  aboutMe: []
}

export default handleActions({
  GET_ABOUT_ME: (state, action) => updateObject(state, { aboutMe: action.payload.data })
}, initialState)

/*  #############       Selectors     ################   */
export const getAboutMe = (state) => (state.aboutMe.aboutMe)
