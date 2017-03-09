import * as types from './actionTypes'

const testEntry = {
  _id: 1,
  dayNumber: 1,
  date: '2017/03/12',
  title: 'some title',
  summary: 'some summary text goes here',
  distanceKm: 10,
  fullText: 'some more full text entry goes here',
  photos: [{
    path: 'route/to/photo1',
    title: 'photo1',
    summary: 'a cool photo1'
  }, {
    path: 'route/to/photo2',
    title: 'photo2',
    summary: 'a cool photo2'
  }],
  budget: [{
    description: 'some food',
    type: 'food',
    ammount: 10
  }]
}

const testRoute = {
  _id: 1,
  order: 1,
  name: 'test 1',
  position: [12, 34],
  done: false
}

const testDayObjects = [1, 2, 3, 4].map(obj => Object.assign({}, testEntry, {title: 'some title 2', dayNumber: obj, _id: obj, distanceKm: 10 * obj}))
const testRoutes = [1, 2, 3, 4].map(obj => Object.assign({}, testRoute, {order: obj, name: testRoute.name + obj, _id: obj}))

export default function reducer (state = {
  username: '',
  dayObjects: testDayObjects,
  route: testRoutes
}, action) {
  switch (action.type) {

    /** *********     UPDATE MAP PROPERTIES ******************/
    case types.PAGE_LOAD: {
      return {...state,
        username: action.payload.username,
        dayObjects: action.payload.dayObjects,
        route: action.payload.route

      }
    }

  }
  return state
}
