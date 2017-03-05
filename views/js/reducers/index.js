import { combineReducers } from 'redux'

import axios from './axiosReducer'
import map from './mapReducer'

export default combineReducers({
  axios,
  map
})
