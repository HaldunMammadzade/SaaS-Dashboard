<template>
  <div :class="{ 'dark': darkMode }" class="app-container">
    <div class="flex h-screen overflow-hidden">
      <!-- Sidebar -->
      <aside 
        :class="[
          'fixed left-0 top-0 h-full z-40 transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
        class="border-r"
      >
        <!-- Logo -->
        <div class="flex items-center justify-between p-6 border-b" :class="darkMode ? 'border-gray-700' : 'border-gray-200'">
          <div v-if="sidebarOpen" class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">S</span>
            </div>
            <span class="text-xl font-bold gradient-text">SaaS Pro</span>
          </div>
          <button 
            @click="toggleSidebar"
            :class="[
              'p-2 rounded-lg transition-colors',
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            ]"
          >
            <svg v-if="sidebarOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="p-4">
          <router-link 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path"
            :class="[
              'flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all duration-200',
              $route.path === item.path 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                : darkMode 
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span v-if="sidebarOpen" class="font-medium">{{ item.label }}</span>
          </router-link>
        </nav>

        <!-- User Profile -->
        <div 
          class="absolute bottom-0 left-0 right-0 p-4 border-t"
          :class="darkMode ? 'border-gray-700' : 'border-gray-200'"
        >
          <div :class="['flex items-center gap-3 p-3 rounded-lg', darkMode ? 'bg-gray-700' : 'bg-gray-50']">
            <img :src="user.avatar" class="w-10 h-10 rounded-full" :alt="user.name" />
            <div v-if="sidebarOpen" class="flex-1">
              <p :class="['text-sm font-semibold', darkMode ? 'text-white' : 'text-gray-900']">{{ user.name }}</p>
              <p :class="['text-xs', darkMode ? 'text-gray-400' : 'text-gray-500']">{{ user.role }}</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div 
        :class="[
          'flex-1 transition-all duration-300',
          sidebarOpen ? 'ml-64' : 'ml-20'
        ]"
      >
        <!-- Header -->
        <header 
          :class="[
            'sticky top-0 z-30 border-b',
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          ]"
        >
          <div class="flex items-center justify-between px-8 py-4">
            <!-- Search -->
            <div class="flex-1 max-w-xl">
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input 
                  type="text"
                  v-model="searchQuery"
                  placeholder="Search anything..."
                  :class="[
                    'w-full pl-10 pr-4 py-2 rounded-lg border transition-all',
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  ]"
                />
              </div>
            </div>

            <!-- Right Actions -->
            <div class="flex items-center gap-4 ml-6">
              <!-- Dark Mode Toggle -->
              <button 
                @click="toggleDarkMode"
                :class="[
                  'p-2 rounded-lg transition-colors',
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                ]"
              >
                <svg v-if="darkMode" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                </svg>
                <svg v-else class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
              </button>

              <!-- Notifications -->
              <button 
                :class="[
                  'relative p-2 rounded-lg transition-colors',
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                <span v-if="notifications > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {{ notifications }}
                </span>
              </button>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main :class="['p-8', darkMode ? 'bg-gray-900' : 'bg-gray-50']" class="min-h-[calc(100vh-73px)] overflow-auto">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from './stores/app'

const store = useAppStore()

const sidebarOpen = computed(() => store.sidebarOpen)
const darkMode = computed(() => store.darkMode)
const notifications = computed(() => store.notifications)
const searchQuery = computed({
  get: () => store.searchQuery,
  set: (value) => store.searchQuery = value
})
const user = computed(() => store.user)

const toggleSidebar = () => store.toggleSidebar()
const toggleDarkMode = () => store.toggleDarkMode()

const menuItems = [
  { path: '/', label: 'Dashboard', icon: 'HomeIcon' },
  { path: '/analytics', label: 'Analytics', icon: 'ChartIcon' },
  { path: '/customers', label: 'Customers', icon: 'UsersIcon' },
  { path: '/products', label: 'Products', icon: 'PackageIcon' },
  { path: '/settings', label: 'Settings', icon: 'SettingsIcon' }
]
</script>

<script>
import { 
  Home as HomeIcon,
  TrendingUp as ChartIcon,
  Users as UsersIcon,
  Package as PackageIcon,
  Settings as SettingsIcon
} from 'lucide-vue-next'

export default {
  components: {
    HomeIcon,
    ChartIcon,
    UsersIcon,
    PackageIcon,
    SettingsIcon
  }
}
</script>
