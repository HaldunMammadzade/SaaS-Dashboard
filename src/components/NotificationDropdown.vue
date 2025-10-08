<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      :class="[
        'relative p-2 rounded-lg transition-colors',
        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
      ]"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
      </svg>
      <span v-if="notifications.length > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
        {{ notifications.length }}
      </span>
    </button>

    <transition name="fade">
      <div 
        v-if="isOpen"
        :class="[
          'absolute right-0 mt-2 w-80 rounded-xl shadow-lg border overflow-hidden z-50',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
      >
        <div class="p-4 border-b" :class="darkMode ? 'border-gray-700' : 'border-gray-200'">
          <div class="flex items-center justify-between">
            <h3 :class="['font-bold', darkMode ? 'text-white' : 'text-gray-900']">
              Notifications
            </h3>
            <button 
              @click="clearAll"
              class="text-xs text-blue-500 hover:text-blue-600 font-medium"
            >
              Clear all
            </button>
          </div>
        </div>

        <div class="max-h-96 overflow-y-auto">
          <div 
            v-for="notif in notifications" 
            :key="notif.id"
            :class="[
              'p-4 border-b transition-colors cursor-pointer',
              darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
            ]"
            @click="removeNotification(notif.id)"
          >
            <div class="flex gap-3">
              <div 
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                  notif.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                  notif.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                  notif.type === 'error' ? 'bg-red-100 dark:bg-red-900/30' :
                  'bg-blue-100 dark:bg-blue-900/30'
                ]"
              >
                <svg 
                  class="w-5 h-5"
                  :class="[
                    notif.type === 'success' ? 'text-green-600 dark:text-green-400' :
                    notif.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                    notif.type === 'error' ? 'text-red-600 dark:text-red-400' :
                    'text-blue-600 dark:text-blue-400'
                  ]"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <p :class="['text-sm font-semibold mb-1', darkMode ? 'text-white' : 'text-gray-900']">
                  {{ notif.title }}
                </p>
                <p :class="['text-xs', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  {{ notif.message }}
                </p>
                <p :class="['text-xs mt-1', darkMode ? 'text-gray-500' : 'text-gray-400']">
                  {{ notif.time }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="notifications.length === 0" class="p-8 text-center">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
            <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
              No notifications
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()
const isOpen = ref(false)
const darkMode = computed(() => store.darkMode)
const notifications = computed(() => store.notificationsList || [])

const clearAll = () => {
  store.clearAllNotifications()
}

const removeNotification = (id) => {
  store.removeNotification(id)
}

const closeDropdown = (e) => {
  if (!e.target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>
