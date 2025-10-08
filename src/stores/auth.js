import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const login = async (credentials) => {
    loading.value = true
    error.value = null
    try {
      const response = await authService.login(credentials)
      if (response.success) {
        isAuthenticated.value = true
        user.value = response.data
        return { success: true }
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    error.value = null
    try {
      const response = await authService.register(userData)
      if (response.success) {
        isAuthenticated.value = true
        user.value = response.data
        return { success: true }
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    authService.logout()
    isAuthenticated.value = false
    user.value = null
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData)
      if (response.success) {
        user.value = { ...user.value, ...response.data }
        return { success: true, message: response.message }
      }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Update failed' }
    }
  }

  const changePassword = async (passwordData) => {
    try {
      const response = await authService.changePassword(passwordData)
      return { success: response.success, message: response.message }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Password change failed' }
    }
  }

  const uploadAvatar = async (file) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const avatarData = e.target.result
      await updateProfile({ avatar: avatarData })
    }
    reader.readAsDataURL(file)
    return { success: true, message: 'Avatar uploaded successfully' }
  }

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (token && storedUser) {
      isAuthenticated.value = true
      user.value = JSON.parse(storedUser)
    }
  }

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    uploadAvatar,
    checkAuth
  }
})
