import routeImport from '../js/admin/route'
const { actions, actionTypes } = routeImport

describe('Route actions', () => {
  it('should open new route dialog', () => {
    const expectedAction = {
      type: actionTypes.SET_NEW_ROUTE_DIALOG_OPEN,
      payload: true
    }
    expect(actions.setNewRouteDialogOpen(true)).toEqual(expectedAction)
  })

  it('should close new route dialog', () => {
    const expectedAction = {
      type: actionTypes.SET_NEW_ROUTE_DIALOG_OPEN,
      payload: false
    }
    expect(actions.setNewRouteDialogOpen(false)).toEqual(expectedAction)
  })

  it('should update map zoom and center on change', () => {
    const newMapDetails = {
      center: {lat: 10, lng: 10},
      zoom: 20,
      bounds: {a: 1, b: 2, c: 3, d: 4}
    }
    const expectedAction = {
      type: actionTypes.ON_MAP_CHANGE,
      payload: newMapDetails
    }
    expect(actions.onMapChange(newMapDetails)).toEqual(Object.assign({}, expectedAction, {payload: Object.assign({}, newMapDetails, {other: {}})}))
  })
})
