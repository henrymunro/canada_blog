import {combineReducers} from 'redux'

import { reducer as adminHome } from './adminHome'
import { reducer as blogEntries } from './blogEntries'
import { reducer as photoUploader } from './photoUploader'
import { reducer as newBlogEntry } from './newBlogEntry'
import { reducer as route } from './route'

export default combineReducers({
  adminHome,
  blogEntries,
  photoUploader,
  newBlogEntry,
  route
})
