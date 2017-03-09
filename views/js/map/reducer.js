export default function reducer (state = {
  mapDefaults: {
    center: [45.7729, -75.43200],
    zoom: 6
  },
  center: [45.7729, -75.43200],
  zoom: 6,
  APIKey: 'AIzaSyBe2yqXC5gvKdZkgwWFFAPjfOyAwJDo3cs',
  markers: [{
    name: 'Montreal',
    center: [45.5017, -73.5673]
  }, {
    name: 'Ottowa',
    center: [45.4215, -75.6972]
  }, {
    name: 'Toronto',
    center: [43.6532, -79.3832]
  }]
}, action) {
  switch (action.type) {

    /** *********     UPDATE MAP PROPERTIES ******************/
    case 'UPDATE_MAP_CENTER': {
      return {...state, center: action.payload}
    }

    case 'UPDATE_MAP_ZOOM': {
      return {...state, zoom: action.payload}
    }
  }
  return state
}
