import { api, URLs } from './axios'

export const savePhotos = (photos) => api.post(URLs.photosAdmin, photos)
