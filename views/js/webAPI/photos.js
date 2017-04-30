import { api, URLs } from './axios'

export const getPhotos = () => api.get(URLs.photos)
