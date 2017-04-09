import { api, URLs } from './axios'

export const getBlogEntries = () => api.get(URLs.blogEntryAdmin)

export const saveNewBlogEntry = (blogEntry) => api.post(URLs.blogEntryAdmin, blogEntry)

export const deleteBlogEntry = (_id) => api.delete(`${URLs.blogEntryAdmin}/${_id}`)

export const saveBlogEntryEdits = (edits) => api.put(`${URLs.blogEntryAdmin}/multiple`, edits)
