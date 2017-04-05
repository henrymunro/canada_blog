import { api, URLs } from './axios'

export const getRoute = () => api.get(URLs.route)
