import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { reducer as admin } from '../admin'
import { reducer as blog } from '../blog'
import { reducer as home } from '../home'
import { reducer as map } from '../map'
import { reducer as photos } from '../photos'
import { reducer as budget } from '../budget'
import { reducer as aboutMe } from '../aboutMe'

export default combineReducers({
  admin,
  blog,
  home,
  map,
  photos,
  budget,
  aboutMe,
  routing: routerReducer
})
