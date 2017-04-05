import { handleActions } from 'redux-actions'
import { updateObject, removeElementFromArray } from '../../reducers/reducerUtilities'

const initialState = {
  dayObjects: []
}

export default handleActions({
  GET_ADMIN_BLOG_ENTRIES_FULFILLED: (state, action) => updateObject(state, { dayObjects: action.payload.data }),
  DELETE_BLOG_ENTRY_FULFILLED: (state, action) => _deleteBlogEntry(state, action)
}, initialState)

const _deleteBlogEntry = (state, action) => {
  if (action.payload.data.success) {
    const dayObjectsNextState = removeElementFromArray(state.dayObjects, action.payload.data.entry._id)
    return updateObject(state, { dayObjects: dayObjectsNextState })
  } else {
    return state
  }
}

/*  #############       Selectors     ################   */
export const getDayObjects = (state) => (state.admin.blogEntries.dayObjects)
