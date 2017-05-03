import { api, URLs } from './axios'

export const postEmailSignUp = ({firstName, lastName, email}) => api.post(URLs.emailSignUp, {firstName, lastName, email})
