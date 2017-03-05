import reducer from '../js/reducers/mapReducer'
import * as types from '../js/constants/ActionTypes'

describe('Map reducer', () => {
  it('updates the map center', () => {
    const newCenter = [100, 50]
    expect(reducer(null, {
      type: types.UPDATE_MAP_CENTER,
      payload: newCenter
    }).center).toEqual(newCenter)
  })

  it('updates the map zoom', () => {
    const newZoom = 6
    expect(reducer(null, {
      type: types.UPDATE_MAP_ZOOM,
      payload: newZoom
    }).zoom).toEqual(newZoom)
  })
})
