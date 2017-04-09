import { handleActions } from 'redux-actions'
import { updateObject, removeElementFromArray, updateOrAddToEditArray } from '../../reducers/reducerUtilities'

const initialState = {
  dayObjects: [],
  dayObjectsEdits: []
}

export default handleActions({
  GET_ADMIN_BLOG_ENTRIES_FULFILLED: (state, action) => updateObject(state, { dayObjects: action.payload.data }),
  DELETE_BLOG_ENTRY_FULFILLED: (state, action) => _deleteBlogEntry(state, action),
  // Map controls
  ROUTE_ON_MAP_CHILD_CLICK: (state, action) => _onMapChildClick(state, action)
}, initialState)

const _deleteBlogEntry = (state, action) => {
  if (action.payload.data.success) {
    const dayObjectsNextState = removeElementFromArray(state.dayObjects, action.payload.data.entry._id)
    return updateObject(state, { dayObjects: dayObjectsNextState })
  } else {
    return state
  }
}

// Handles the drag and drop function for the route points and their bezier points
const _onMapChildClick = (state, action) => {
  const { _id, type, mouse, move } = action.payload
  const { lat, lng } = mouse
  if (!move || !(type === 'blog' || type === 'bezier')) {
    return state
  }
  // deal with route center updates
  let nextBlogEditState
  if (type === 'blog') {
    const updates = {_id, center: { lat, lng }}
    nextBlogEditState = updateOrAddToEditArray(state.dayObjects, state.dayObjectsEdits, updates)
  }
  // deal with bezier updates
  if (type === 'bezier') {
    // pull out which of the two bezier points has been clicked (passed in the ID field as _0 or _1)
    const bezierNo = _id.substr(-1)
    // Trim down ID of passed bezier number
    const actualId = _id.slice(0, -2)
    // Check to make sure this is a route bezier else return no changes
    const thisElement = state.dayObjects.filter((elm) => elm._id === actualId).length > 0
    if (!thisElement) return state

    const updates = {_id: actualId, [`bezier${bezierNo}`]: { lat, lng }}
    nextBlogEditState = updateOrAddToEditArray(state.dayObjects, state.dayObjectsEdits, updates)
  }

  return updateObject(state, { dayObjectsEdits: nextBlogEditState })
}

/*  #############       Selectors     ################   */
// export const getDayObjects = (state) => (state.admin.blogEntries.dayObjects)

export const getDayObjects = state => {
  const { dayObjects, dayObjectsEdits } = state.admin.blogEntries
  return dayObjects.map((value, key) => {
    const edit = dayObjectsEdits.find(elm => elm._id === value._id)
    return edit || value
  })
}

export const getDayObjectsEdits = state => (state.admin.blogEntries.dayObjectsEdits)
