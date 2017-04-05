import { handleActions } from 'redux-actions'
import { updateObject } from '../reducers/reducerUtilities'

const initialState = {
  blog: []
}

export default handleActions({
  GET_BLOG_FULFILLED: (state, action) => updateObject(state, { blog: action.payload.data })
}, initialState)

/*  #############       Selectors     ################   */
export const getBlog = (state) => (state.blog.blog)
