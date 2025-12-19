import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const signup = (payload) => api.post('/api/auth/signup', payload)
export const login = (payload) => api.post('/api/auth/login', payload)

// Restaurants / Menu
export const getRestaurants = () => api.get('/api/restaurants')
export const getRestaurantMenu = (id) => api.get(`/api/restaurants/${id}/menu`)

// Cart / Orders
export const placeOrder = (payload) => api.post('/api/orders', payload)
export const getMyOrders = () => api.get('/api/orders/my')

export default api
