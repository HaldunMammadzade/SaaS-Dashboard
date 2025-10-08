<template>
  <div class="settings">
    <div class="mb-6 sm:mb-8">
      <h1 :class="['text-2xl sm:text-3xl font-bold mb-2', darkMode ? 'text-white' : 'text-gray-900']">
        Settings
      </h1>
      <p :class="['text-xs sm:text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
        Manage your account settings and preferences
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Settings Menu -->
      <div 
        :class="[
          'lg:col-span-1 rounded-xl border shadow-sm p-4',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
      >
        <nav class="space-y-2">
          <button 
            v-for="tab in settingsTabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left',
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                : darkMode 
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            ]"
          >
            <component :is="tab.icon" class="w-5 h-5" />
            <span class="font-medium">{{ tab.label }}</span>
          </button>
        </nav>
      </div>

      <!-- Settings Content -->
      <div class="lg:col-span-3 space-y-6">
        <!-- Profile Settings -->
        <div v-if="activeTab === 'profile'">
          <div 
            :class="[
              'rounded-xl border shadow-sm p-4 sm:p-6 mb-6',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            ]"
          >
            <h3 :class="['text-lg font-bold mb-6', darkMode ? 'text-white' : 'text-gray-900']">
              Profile Information
            </h3>

            <div class="flex flex-col sm:flex-row items-center gap-6 mb-6">
              <div class="relative">
                <img :src="currentUser.avatar" class="w-24 h-24 rounded-full object-cover" :alt="currentUser.name" />
                <label 
                  class="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    @change="handleAvatarUpload" 
                    class="hidden"
                  />
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </label>
              </div>
              <div class="text-center sm:text-left">
                <h4 :class="['text-lg font-bold mb-1', darkMode ? 'text-white' : 'text-gray-900']">
                  Profile Picture
                </h4>
                <p :class="['text-sm mb-3', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  JPG, PNG or GIF. Max size 2MB
                </p>
                <button 
                  @click="removeAvatar"
                  class="text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  Remove Picture
                </button>
              </div>
            </div>

            <form @submit.prevent="updateProfile" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700']">
                    Full Name
                  </label>
                  <input 
                    v-model="profileForm.name"
                    type="text"
                    :class="[
                      'w-full px-4 py-3 rounded-lg border transition-all',
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                    ]"
                  />
                </div>
                <div>
                  <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700']">
                    Email Address
                  </label>
                  <input 
                    v-model="profileForm.email"
                    type="email"
                    :class="[
                      'w-full px-4 py-3 rounded-lg border transition-all',
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                    ]"
                  />
                </div>
                <div>
                  <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700']">
                    Phone Number
                  </label>
                  <input 
                    v-model="profileForm.phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    :class="[
                      'w-full px-4 py-3 rounded-lg border transition-all',
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                    ]"
                  />
                </div>
                <div>
                  <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700']">
                    Company
                  </label>
                  <input 
                    v-model="profileForm.company"
                    type="text"
                    placeholder="Your Company"
                    :class="[
                      'w-full px-4 py-3 rounded-lg border transition-all',
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                    ]"
                  />
                </div>
                <div class="md:col-span-2">
                  <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700']">
                    Bio
                  </label>
                  <textarea 
                    v-model="profileForm.bio"
                    rows="3"
                    placeholder="Tell us about yourself..."
                    :class="[
                      'w-full px-4 py-3 rounded-lg border transition-all resize-none',
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                    ]"
                  ></textarea>
                </div>
              </div>

              <div v-if="profileMessage" :class="[
                'p-3 rounded-lg',
                profileMessage.type === 'success' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              ]">
                <p class="text-sm">{{ profileMessage.text }}</p>
              </div>

              <div class="flex flex-col sm:flex-row justify-end gap-3">
                <button 
                  type="button"
                  @click="cancelProfileEdit"
                  :class="[
                    'px-6 py-3 rounded-lg font-semibold transition-colors',
                    darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  ]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <!-- Danger Zone -->
          <div 
            :class="[
              'rounded-xl border-2 p-4 sm:p-6',
              'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10'
            ]"
          >
            <h3 class="text-lg font-bold text-red-600 dark:text-red-400 mb-4">
              Danger Zone
            </h3>
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p :class="['font-medium mb-1', darkMode ? 'text-white' : 'text-gray-900']">
                  Delete Account
                </p>
                <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Once you delete your account, there is no going back.
                </p>
              </div>
              <button 
                @click="confirmDeleteAccount"
                class="w-full sm:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <div 
            :class="[
              'rounded-xl border shadow-sm p-4 sm:p-6',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            ]"
          >
            <h3 :class="['text-lg font-bold mb-6', darkMode ? 'text-white' : 'text-gray-900']">
              Change Password
            </h3>

            <form @submit.prevent="changePassword" class="space-y-4">
              <div>
                <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700']">
                  Current Password
                </label>
                <input 
                  v-model="passwordForm.currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  :class="[
                    'w-full px-4 py-3 rounded-lg border transition-all',
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  ]"
                />
              </div>
              <div>
                <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700']">
                  New Password
                </label>
                <input 
                  v-model="passwordForm.newPassword"
                  type="password"
                  placeholder="Enter new password"
                  :class="[
                    'w-full px-4 py-3 rounded-lg border transition-all',
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  ]"
                />
              </div>
              <div>
                <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700']">
                  Confirm New Password
                </label>
                <input 
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  :class="[
                    'w-full px-4 py-3 rounded-lg border transition-all',
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  ]"
                />
              </div>

              <div v-if="passwordMessage" :class="[
                'p-3 rounded-lg',
                passwordMessage.type === 'success' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              ]">
                <p class="text-sm">{{ passwordMessage.text }}</p>
              </div>

              <button 
                type="submit"
                class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Update Password
              </button>
            </form>
          </div>

          <div 
            :class="[
              'rounded-xl border shadow-sm p-4 sm:p-6',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            ]"
          >
            <h3 :class="['text-lg font-bold mb-6', darkMode ? 'text-white' : 'text-gray-900']">
              Two-Factor Authentication
            </h3>
            
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p :class="['font-medium mb-1', darkMode ? 'text-white' : 'text-gray-900']">
                  Enable 2FA
                </p>
                <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Add an extra layer of security to your account
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="twoFactorEnabled" class="sr-only peer">
                <div class="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Notifications Settings -->
        <div v-if="activeTab === 'notifications'">
          <div 
            :class="[
              'rounded-xl border shadow-sm p-4 sm:p-6',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            ]"
          >
            <h3 :class="['text-lg font-bold mb-6', darkMode ? 'text-white' : 'text-gray-900']">
              Notification Preferences
            </h3>

            <div class="space-y-6">
              <div 
                v-for="notif in notificationSettings" 
                :key="notif.id"
                class="flex items-center justify-between py-4 border-b last:border-b-0"
                :class="darkMode ? 'border-gray-700' : 'border-gray-100'"
              >
                <div class="flex items-center gap-4">
                  <div 
                    :class="[
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      notif.iconBg
                    ]"
                  >
                    <component :is="notif.icon" class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p :class="['font-medium mb-1', darkMode ? 'text-white' : 'text-gray-900']">
                      {{ notif.title }}
                    </p>
                    <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
                      {{ notif.description }}
                    </p>
                  </div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="notif.enabled" class="sr-only peer">
                  <div class="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Appearance Settings -->
        <div v-if="activeTab === 'appearance'">
          <div 
            :class="[
              'rounded-xl border shadow-sm p-4 sm:p-6',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            ]"
          >
            <h3 :class="['text-lg font-bold mb-6', darkMode ? 'text-white' : 'text-gray-900']">
              Theme Settings
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                @click="!darkMode && toggleDarkMode()"
                :class="[
                  'cursor-pointer rounded-xl border-2 p-6 transition-all',
                  !darkMode 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                ]"
              >
                <div class="flex items-center justify-between mb-4">
                  <component :is="SunIcon" class="w-8 h-8 text-yellow-500" />
                  <div v-if="!darkMode" class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <component :is="CheckIcon" class="w-4 h-4 text-white" />
                  </div>
                </div>
                <h4 :class="['font-bold mb-1', darkMode ? 'text-white' : 'text-gray-900']">
                  Light Mode
                </h4>
                <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Clean and bright interface
                </p>
              </div>

              <div 
                @click="darkMode && toggleDarkMode()"
                :class="[
                  'cursor-pointer rounded-xl border-2 p-6 transition-all',
                  darkMode 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                ]"
              >
                <div class="flex items-center justify-between mb-4">
                  <component :is="MoonIcon" class="w-8 h-8 text-purple-500" />
                  <div v-if="darkMode" class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <component :is="CheckIcon" class="w-4 h-4 text-white" />
                  </div>
                </div>
                <h4 :class="['font-bold mb-1', darkMode ? 'text-white' : 'text-gray-900']">
                  Dark Mode
                </h4>
                <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Easy on the eyes
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Billing Settings -->
        <div v-if="activeTab === 'billing'">
          <div 
            :class="[
              'rounded-xl border shadow-sm p-4 sm:p-6',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            ]"
          >
            <h3 :class="['text-lg font-bold mb-6', darkMode ? 'text-white' : 'text-gray-900']">
              Current Plan
            </h3>

            <div class="flex flex-col sm:flex-row items-center justify-between p-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-6">
              <div>
                <h4 class="text-2xl font-bold mb-2">Enterprise Plan</h4>
                <p class="text-blue-100">Billed annually</p>
              </div>
              <div class="text-right mt-4 sm:mt-0">
                <p class="text-4xl font-bold">$299</p>
                <p class="text-blue-100">per month</p>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-3">
                <component :is="CheckIcon" class="w-5 h-5 text-green-500 flex-shrink-0" />
                <span :class="darkMode ? 'text-gray-300' : 'text-gray-700'">Unlimited users</span>
              </div>
              <div class="flex items-center gap-3">
                <component :is="CheckIcon" class="w-5 h-5 text-green-500 flex-shrink-0" />
                <span :class="darkMode ? 'text-gray-300' : 'text-gray-700'">Advanced analytics</span>
              </div>
              <div class="flex items-center gap-3">
                <component :is="CheckIcon" class="w-5 h-5 text-green-500 flex-shrink-0" />
                <span :class="darkMode ? 'text-gray-300' : 'text-gray-700'">Priority support</span>
              </div>
            </div>

            <button class="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '../stores/app'
import { useRouter } from 'vue-router'
import {
  User as UserIcon,
  Shield as ShieldIcon,
  Bell as BellIcon,
  Palette as PaletteIcon,
  CreditCard as CreditCardIcon,
  Mail as MailIcon,
  MessageSquare as MessageIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  Check as CheckIcon
} from 'lucide-vue-next'

const store = useAppStore()
const router = useRouter()

const darkMode = computed(() => store.darkMode)
const currentUser = computed(() => store.user)
const toggleDarkMode = () => store.toggleDarkMode()

const activeTab = ref('profile')
const twoFactorEnabled = ref(false)
const profileMessage = ref(null)
const passwordMessage = ref(null)

const profileForm = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  bio: ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: UserIcon },
  { id: 'security', label: 'Security', icon: ShieldIcon },
  { id: 'notifications', label: 'Notifications', icon: BellIcon },
  { id: 'appearance', label: 'Appearance', icon: PaletteIcon },
  { id: 'billing', label: 'Billing', icon: CreditCardIcon }
]

const notificationSettings = ref([
  {
    id: 1,
    title: 'Email Notifications',
    description: 'Receive email updates about your account',
    icon: MailIcon,
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    enabled: true
  },
  {
    id: 2,
    title: 'Push Notifications',
    description: 'Get push notifications on your device',
    icon: BellIcon,
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    enabled: true
  },
  {
    id: 3,
    title: 'SMS Notifications',
    description: 'Receive important updates via SMS',
    icon: MessageIcon,
    iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600',
    enabled: false
  }
])

onMounted(() => {
  if (currentUser.value) {
    profileForm.value = {
      name: currentUser.value.name,
      email: currentUser.value.email,
      phone: currentUser.value.phone || '',
      company: currentUser.value.company || '',
      bio: currentUser.value.bio || ''
    }
  }
})

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      profileMessage.value = { type: 'error', text: 'File size must be less than 2MB' }
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      currentUser.value.avatar = e.target.result
      profileMessage.value = { type: 'success', text: 'Avatar uploaded successfully' }
      setTimeout(() => profileMessage.value = null, 3000)
    }
    reader.readAsDataURL(file)
  }
}

const removeAvatar = () => {
  if (currentUser.value) {
    currentUser.value.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.value.name}`
    profileMessage.value = { type: 'success', text: 'Avatar removed successfully' }
    setTimeout(() => profileMessage.value = null, 3000)
  }
}

const updateProfile = () => {
  Object.assign(currentUser.value, profileForm.value)
  profileMessage.value = { type: 'success', text: 'Profile updated successfully' }
  setTimeout(() => profileMessage.value = null, 3000)
}

const cancelProfileEdit = () => {
  if (authUser.value) {
    profileForm.value = {
      name: authUser.value.name,
      email: authUser.value.email,
      phone: authUser.value.phone || '',
      company: authUser.value.company || '',
      bio: authUser.value.bio || ''
    }
  }
  profileMessage.value = null
}

const changePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordMessage.value = { type: 'error', text: 'Passwords do not match' }
    return
  }
  
  if (passwordForm.value.newPassword.length < 6) {
    passwordMessage.value = { type: 'error', text: 'Password must be at least 6 characters' }
    return
  }

  const result = authStore.changePassword(passwordForm.value)
  if (result.success) {
    passwordMessage.value = { type: 'success', text: result.message }
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    setTimeout(() => passwordMessage.value = null, 3000)
  } else {
    passwordMessage.value = { type: 'error', text: result.message }
  }
}

const confirmDeleteAccount = () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    authStore.logout()
    router.push('/login')
  }
}
</script>