import { handleActions } from 'redux-actions'

const initialState = {
  mapDefaults: {
    center: [45.7729, -75.43200],
    zoom: 6
  },
  APIKey: 'AIzaSyBkbeNS5l0CvM9I0LldK9B4uGhLfWFzRkI'
}

export default handleActions({
  ON_DEFAULT_MAP_LOAD: (state, action) => (state)
}, initialState)

// Selectors
export const getMapAPIKey = (state) => (state.map.APIKey)

export const getMapDefaults = (state) => (state.map.mapDefaults)
