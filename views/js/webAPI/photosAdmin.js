import { api, URLs } from './axios'

export const savePhotos = (photos) => api.post(URLs.photosAdmin, photos)

export const updatePhoto = ({_id, updates}) => api.put(`${URLs.photosAdmin}/${_id}`, updates)
