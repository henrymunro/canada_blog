import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { reducer as admin } from '../admin'
import { reducer as blog } from '../blog'
import { reducer as home } from '../home'
import { reducer as map } from '../map'

export default combineReducers({
  admin,
  blog,
  home,
  map,
  routing: routerReducer
})
