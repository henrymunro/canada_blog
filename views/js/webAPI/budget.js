import { api, URLs } from './axios'

export const getBudget = () => api.get(URLs.budget)
