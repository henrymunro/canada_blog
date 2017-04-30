import { api, URLs } from './axios'

export const getAboutMe = () => api.get(URLs.aboutMe)
