import { reducer } from '../js/admin'
import * as actionTypes from '../js/admin/actionTypes'

describe('Admin reducer', () => {
  it('updates the relevant details on page load', () => {
    const pageLoadData = {
      username: 'testUsername',
      dayObjects: [{dayNumber: 1, title: 'test title'}],
      route: [{order: 1, name: 'test1'}]
    }
    const reducerResult = reducer(null, {
      type: actionTypes.PAGE_LOAD,
      payload: pageLoadData
    })
    expect(reducerResult.username).toEqual(pageLoadData.username)
    expect(reducerResult.dayObjects).toEqual(pageLoadData.dayObjects)
    expect(reducerResult.route).toEqual(pageLoadData.route)
  })
})
