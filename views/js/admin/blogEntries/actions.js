import { createActions } from 'redux-actions'
import * as actions from './actionTypes'
import webAPI from '../../webAPI'

export default createActions({
// Sever API
  [actions.GET_ADMIN_BLOG_ENTRIES]: () => webAPI.blogEntryAdmin.getBlogEntries(),
  [actions.DELETE_BLOG_ENTRY]: (_id) => webAPI.blogEntryAdmin.deleteBlogEntry(_id)

// CLient changes

})
