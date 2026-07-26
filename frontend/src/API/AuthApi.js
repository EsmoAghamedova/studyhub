import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authApi = {
  register: async (username, email, password) => {
    const res = await API.post('/auth/register', { username, email, password })
    return res.data
  },

  login: async (email, password) => {
    const res = await API.post('/auth/login', { email, password })
    return res.data
  },
}

export default API