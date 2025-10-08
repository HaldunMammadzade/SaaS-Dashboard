<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
    <div class="absolute inset-0 bg-black opacity-20"></div>
    
    <div class="relative w-full max-w-md">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span class="text-white font-bold text-2xl">S</span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
          <p class="text-gray-600 dark:text-gray-400">Join SaaS Pro today</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input 
              v-model="form.name"
              type="text"
              required
              placeholder="John Smith"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input 
              v-model="form.email"
              type="email"
              required
              placeholder="john@example.com"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input 
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <input 
              v-model="form.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <label class="flex items-center">
            <input type="checkbox" required class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
            <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
              I agree to the <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Terms</a> and <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
            </span>
          </label>

          <div v-if="error" class="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg">
            <p class="text-sm text-red-700 dark:text-red-400">{{ error }}</p>
          </div>

          <button 
            type="submit"
            :disabled="loading"
            class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
          >
            <span v-if="loading">Creating account...</span>
            <span v-else>Create Account</span>
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Already have an account? 
            <router-link to="/login" class="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </router-link>
          </p>
        </div>
      </div>

      <p class="text-center text-white text-sm mt-6">
        © 2025 SaaS Pro. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true
  error.value = ''

  setTimeout(() => {
    const result = authStore.register(form.value)
    
    if (result.success) {
      router.push('/')
    } else {
      error.value = result.message
    }
    
    loading.value = false
  }, 500)
}
</script>
