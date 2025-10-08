<template>
  <div :class="{ 'dark': darkMode }">
    <div class="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <!-- Mobile Overlay -->
      <div 
        v-if="sidebarOpen && isMobile"
        class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        @click="toggleSidebar"
      ></div>

      <!-- Sidebar -->
      <aside 
        :class="[
          'fixed left-0 top-0 h-full z-40 transition-all duration-300 border-r',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          isMobile ? 'w-64' : (sidebarOpen ? 'w-64' : 'w-20'),
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
      >
        <div class="flex items-center justify-between p-6 border-b" :class="darkMode ? 'border-gray-700' : 'border-gray-200'">
          <div v-if="sidebarOpen || isMobile" class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">S</span>
            </div>
            <span class="text-xl font-bold gradient-text">SaaS Pro</span>
          </div>
          <button 
            @click="toggleSidebar"
            class="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <nav class="p-4 overflow-y-auto" style="height: calc(100vh - 160px)">
          <router-link 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path"
            @click="isMobile && toggleSidebar()"
            :class="[
              'flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all duration-200',
              $route.path === item.path 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                : darkMode 
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            ]"
          >
            <span v-html="item.icon"></span>
            <span v-if="sidebarOpen || isMobile" class="font-medium">{{ item.label }}</span>
          </router-link>
        </nav>

        <div 
          class="absolute bottom-0 left-0 right-0 p-4 border-t"
          :class="darkMode ? 'border-gray-700' : 'border-gray-200'"
        >
          <div :class="['flex items-center gap-3 p-3 rounded-lg', darkMode ? 'bg-gray-700' : 'bg-gray-50']">
            <img :src="user.avatar" class="w-10 h-10 rounded-full" :alt="user.name" />
            <div v-if="sidebarOpen || isMobile" class="flex-1 min-w-0">
              <p :class="['text-sm font-semibold truncate', darkMode ? 'text-white' : 'text-gray-900']">{{ user.name }}</p>
              <p :class="['text-xs truncate', darkMode ? 'text-gray-400' : 'text-gray-500']">{{ user.role }}</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div 
        :class="[
          'flex-1 transition-all duration-300',
          isMobile ? 'ml-0' : (sidebarOpen ? 'ml-64' : 'ml-20')
        ]"
      >
        <!-- Header -->
        <header 
          :class="[
            'sticky top-0 z-30 border-b',
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          ]"
        >
          <div class="flex items-center justify-between px-4 lg:px-8 py-4">
            <!-- Mobile Menu Button -->
            <button 
              v-if="isMobile"
              @click="toggleSidebar"
              class="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            <!-- Search -->
            <div class="flex-1 max-w-xl mx-4">
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input 
                  type="text"
                  v-model="searchQuery"
                  placeholder="Search..."
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
            <div class="flex items-center gap-2 lg:gap-4">
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

              <NotificationDropdown />
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main :class="['p-4 lg:p-8 overflow-auto', darkMode ? 'bg-gray-900' : 'bg-gray-50']" style="height: calc(100vh - 73px)">
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
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from './stores/app'
import NotificationDropdown from './components/NotificationDropdown.vue'

const store = useAppStore()
const isMobile = ref(window.innerWidth < 1024)

const sidebarOpen = computed(() => store.sidebarOpen)
const darkMode = computed(() => store.darkMode)
const searchQuery = computed({
  get: () => store.searchQuery,
  set: (value) => store.searchQuery = value
})
const user = computed(() => store.user)

const toggleSidebar = () => store.toggleSidebar()
const toggleDarkMode = () => store.toggleDarkMode()

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024
  if (!isMobile.value && !store.sidebarOpen) {
    store.toggleSidebar()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const menuItems = [
  { 
    path: '/', 
    label: 'Dashboard', 
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>'
  },
  { 
    path: '/analytics', 
    label: 'Analytics', 
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>'
  },
  { 
    path: '/customers', 
    label: 'Customers', 
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
  },
  { 
    path: '/products', 
    label: 'Products', 
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>'
  },
  { 
    path: '/settings', 
    label: 'Settings', 
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'
  }
]
</script>
