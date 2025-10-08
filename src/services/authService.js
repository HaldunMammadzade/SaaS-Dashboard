import api from './api'

export const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData)
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.data))
    }
    return response.data
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials)
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.data))
    }
    return response.data
  },

  async getProfile() {
    const response = await api.get('/auth/profile')
    return response.data
  },

  async updateProfile(profileData) {
    const response = await api.put('/auth/profile', profileData)
    if (response.data.success) {
      const user = JSON.parse(localStorage.getItem('user'))
      const updatedUser = { ...user, ...response.data.data }
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
    return response.data
  },

  async changePassword(passwordData) {
    const response = await api.put('/auth/password', passwordData)
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
