import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)

  const login = (credentials) => {
    // Demo login - real backend-də API call olacaq
    if (credentials.email && credentials.password) {
      isAuthenticated.value = true
      user.value = {
        name: 'John Smith',
        email: credentials.email,
        role: 'Administrator',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        phone: '+1 (555) 123-4567',
        company: 'Tech Corp',
        bio: 'Experienced software developer and team leader'
      }
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(user.value))
      return { success: true }
    }
    return { success: false, message: 'Invalid credentials' }
  }

  const register = (userData) => {
    // Demo register - real backend-də API call olacaq
    if (userData.email && userData.password && userData.name) {
      isAuthenticated.value = true
      user.value = {
        name: userData.name,
        email: userData.email,
        role: 'User',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
        phone: '',
        company: '',
        bio: ''
      }
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(user.value))
      return { success: true }
    }
    return { success: false, message: 'Please fill all fields' }
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  const updateProfile = (profileData) => {
    if (user.value) {
      user.value = { ...user.value, ...profileData }
      localStorage.setItem('user', JSON.stringify(user.value))
      return { success: true, message: 'Profile updated successfully' }
    }
    return { success: false, message: 'User not found' }
  }

  const changePassword = (passwordData) => {
    // Demo password change - real backend-də API call olacaq
    if (passwordData.currentPassword && passwordData.newPassword) {
      return { success: true, message: 'Password changed successfully' }
    }
    return { success: false, message: 'Invalid password data' }
  }

  const uploadAvatar = (file) => {
    // Demo avatar upload - real backend-də file upload olacaq
    const reader = new FileReader()
    reader.onload = (e) => {
      if (user.value) {
        user.value.avatar = e.target.result
        localStorage.setItem('user', JSON.stringify(user.value))
      }
    }
    reader.readAsDataURL(file)
    return { success: true, message: 'Avatar uploaded successfully' }
  }

  const checkAuth = () => {
    const authStatus = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('user')
    if (authStatus === 'true' && storedUser) {
      isAuthenticated.value = true
      user.value = JSON.parse(storedUser)
    }
  }

  return {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    uploadAvatar,
    checkAuth
  }
})
