import * as types from './actionTypes'

export default function reducer (state = {
  username: 'henry'
}, action) {
  switch (action.type) {

    /** *********     UPDATE MAP PROPERTIES ******************/
    case types.PAGE_LOAD: {
      return {...state,
        username: action.payload.username

      }
    }

  }
  return state
}
