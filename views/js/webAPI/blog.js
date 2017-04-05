import { api, URLs } from './axios'

export const getBlog = () => api.get(URLs.blog)
