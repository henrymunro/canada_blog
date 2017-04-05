import { api, URLs } from './axios'

export const getRoutes = () => api.get(URLs.routeAdmin)

export const deleteRouteEntry = (_id) => api.delete(`${URLs.routeAdmin}/${_id}`)

export const saveNewRoutePoint = (point) => api.post(`${URLs.routeAdmin}`, point)

export const saveRouteEdits = (edits) => api.put(`${URLs.routeAdmin}/multiple`, edits)
