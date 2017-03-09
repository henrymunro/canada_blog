import { combineReducers } from 'redux'

import axios from './axiosReducer'
import map from '../map/reducer'
import { reducer as admin } from '../admin'

export default combineReducers({
  axios,
  map,
  admin
})
