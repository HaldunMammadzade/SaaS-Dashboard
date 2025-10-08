<template>
  <div class="settings">
    <div class="mb-8">
      <h1 :class="['text-3xl font-bold mb-2', darkMode ? 'text-white' : 'text-gray-900']">
        Settings
      </h1>
      <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
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
        <div v-if="activeTab === 'profile'" class="space-y-6">
          <div 
            :class="[
              'rounded-xl border shadow-sm p-6',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            ]"
          >
            <h3 :class="['text-lg font-bold mb-6', darkMode ? 'text-white' : 'text-gray-900']">
              Profile Information
            </h3>

            <div class="flex items-center gap-6 mb-6">
              <img :src="user.avatar" class="w-24 h-24 rounded-full" :alt="user.name" />
              <div>
                <button class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all">
                  Change Avatar
                </button>
                <p :class="['text-xs mt-2', darkMode ? 'text-gray-400' : 'text-gray-500']">
                  JPG, PNG or GIF. Max size 2MB
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700']">
                  Full Name
                </label>
                <input 
                  type="text"
                  :value="user.name"
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
                  type="email"
                  :value="user.email"
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
                  Role
                </label>
                <input 
                  type="text"
                  :value="user.role"
                  disabled
                  :class="[
                    'w-full px-4 py-3 rounded-lg border transition-all opacity-60',
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  ]"
                />
              </div>
              <div>
                <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700']">
                  Phone Number
                </label>
                <input 
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
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button 
                :class="[
                  'px-6 py-3 rounded-lg font-semibold transition-colors',
                  darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                ]"
              >
                Cancel
              </button>
              <button class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <div 
            :class="[
              'rounded-xl border shadow-sm p-6',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            ]"
          >
            <h3 :class="['text-lg font-bold mb-6', darkMode ? 'text-white' : 'text-gray-900']">
              Change Password
            </h3>

            <div class="space-y-4">
              <div>
                <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700']">
                  Current Password
                </label>
                <input 
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
            </div>

            <button class="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Update Password
            </button>
          </div>

          <div 
            :class="[
              'rounded-xl border shadow-sm p-6',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            ]"
          >
            <h3 :class="['text-lg font-bold mb-6', darkMode ? 'text-white' : 'text-gray-900']">
              Two-Factor Authentication
            </h3>
            
            <div class="flex items-center justify-between">
              <div>
                <p :class="['font-medium mb-1', darkMode ? 'text-white' : 'text-gray-900']">
                  Enable 2FA
                </p>
                <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Add an extra layer of security to your account
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer">
                <div class="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Notifications Settings -->
        <div v-if="activeTab === 'notifications'" class="space-y-6">
          <div 
            :class="[
              'rounded-xl border shadow-sm p-6',
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
                class="flex items-center justify-between py-4 border-b"
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
                  <input type="checkbox" :checked="notif.enabled" class="sr-only peer">
                  <div class="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Appearance Settings -->
        <div v-if="activeTab === 'appearance'" class="space-y-6">
          <div 
            :class="[
              'rounded-xl border shadow-sm p-6',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            ]"
          >
            <h3 :class="['text-lg font-bold mb-6', darkMode ? 'text-white' : 'text-gray-900']">
              Theme Settings
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <div 
                @click="toggleDarkMode"
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
                @click="toggleDarkMode"
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
        <div v-if="activeTab === 'billing'" class="space-y-6">
          <div 
            :class="[
              'rounded-xl border shadow-sm p-6',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            ]"
          >
            <h3 :class="['text-lg font-bold mb-6', darkMode ? 'text-white' : 'text-gray-900']">
              Current Plan
            </h3>

            <div class="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-6">
              <div>
                <h4 class="text-2xl font-bold mb-2">Enterprise Plan</h4>
                <p class="text-blue-100">Billed annually</p>
              </div>
              <div class="text-right">
                <p class="text-4xl font-bold">$299</p>
                <p class="text-blue-100">per month</p>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-3">
                <component :is="CheckIcon" class="w-5 h-5 text-green-500" />
                <span :class="darkMode ? 'text-gray-300' : 'text-gray-700'">Unlimited users</span>
              </div>
              <div class="flex items-center gap-3">
                <component :is="CheckIcon" class="w-5 h-5 text-green-500" />
                <span :class="darkMode ? 'text-gray-300' : 'text-gray-700'">Advanced analytics</span>
              </div>
              <div class="flex items-center gap-3">
                <component :is="CheckIcon" class="w-5 h-5 text-green-500" />
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
import { ref, computed } from 'vue'
import { useAppStore } from '../stores/app'
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
const darkMode = computed(() => store.darkMode)
const user = computed(() => store.user)
const toggleDarkMode = () => store.toggleDarkMode()

const activeTab = ref('profile')

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: UserIcon },
  { id: 'security', label: 'Security', icon: ShieldIcon },
  { id: 'notifications', label: 'Notifications', icon: BellIcon },
  { id: 'appearance', label: 'Appearance', icon: PaletteIcon },
  { id: 'billing', label: 'Billing', icon: CreditCardIcon }
]

const notificationSettings = [
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
]
</script>
