import { createActions } from 'redux-actions'
import * as actions from './actionTypes'
import webAPI from '../../webAPI'
import { mapActionsCreator } from '../../map'

const newBlogEntryMapActions = mapActionsCreator('NEW_BLOG_ENTRY')

const newBlogEntryActions = createActions({
  // Sever API
  [actions.SAVE_NEW_BLOG_ENTRY]: (blogEntry) => webAPI.blogEntryAdmin.saveNewBlogEntry(blogEntry),
  [actions.DELETE_BLOG_ENTRY]: (_id) => webAPI.blogEntryAdmin.deleteRouteEntry(_id),
  // CLient changes
  [actions.UPDATE_NEW_BLOG_ENTRY_FORM]: (key, value) => ({[key]: value}),
  [actions.TOGGLE_NEW_BLOG_ENTRY_PROP]: (key, value) => ({[key]: value}),
  [actions.MOVE_NEW_BLOG_PHOTO_UP_IN_ARRAY]: (_id) => ({_id})
},
actions.ON_NEW_BLOG_PHOTO_EDIT,
actions.SAVE_NEW_BLOG_PHOTOS_EDITS,
)

export default Object.assign({}, newBlogEntryMapActions, newBlogEntryActions)
