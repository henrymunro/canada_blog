import * as actions from '../js/map/actions'
import * as types from '../js/constants/ActionTypes'

describe('Map actions', () => {
  it('should update map center', () => {
    const center = [100, 20]
    const expectedAction = {
      type: types.UPDATE_MAP_CENTER,
      payload: center
    }
    expect(actions.updateMapCenter(center)).toEqual(expectedAction)
  })

  it('should update map zoom', () => {
    const zoom = 10
    const expectedAction = {
      type: types.UPDATE_MAP_ZOOM,
      payload: zoom
    }
    expect(actions.updateMapZoom(zoom)).toEqual(expectedAction)
  })
})
