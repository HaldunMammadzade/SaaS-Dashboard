<template>
  <transition name="fade">
    <div 
      v-if="isOpen && item"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto"
      @click.self="close"
    >
      <div 
        :class="[
          'w-full max-w-2xl rounded-xl shadow-2xl my-8',
          darkMode ? 'bg-gray-800' : 'bg-white'
        ]"
      >
        <div class="p-6 border-b" :class="darkMode ? 'border-gray-700' : 'border-gray-200'">
          <div class="flex items-center justify-between">
            <h2 :class="['text-xl sm:text-2xl font-bold', darkMode ? 'text-white' : 'text-gray-900']">
              {{ title }}
            </h2>
            <button 
              @click="close"
              class="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <!-- Customer View -->
          <div v-if="type === 'customer'" class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                {{ item.name.charAt(0) }}
              </div>
              <div>
                <h3 :class="['text-xl sm:text-2xl font-bold', darkMode ? 'text-white' : 'text-gray-900']">
                  {{ item.name }}
                </h3>
                <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  {{ item.email }}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div :class="['p-4 rounded-lg', darkMode ? 'bg-gray-700' : 'bg-gray-50']">
                <p :class="['text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Plan
                </p>
                <p :class="['text-lg font-bold', darkMode ? 'text-white' : 'text-gray-900']">
                  {{ item.plan }}
                </p>
              </div>

              <div :class="['p-4 rounded-lg', darkMode ? 'bg-gray-700' : 'bg-gray-50']">
                <p :class="['text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Status
                </p>
                <span 
                  :class="[
                    'inline-block px-3 py-1 rounded-full text-sm font-semibold',
                    item.status === 'active' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                  ]"
                >
                  {{ item.status }}
                </span>
              </div>

              <div :class="['p-4 rounded-lg', darkMode ? 'bg-gray-700' : 'bg-gray-50']">
                <p :class="['text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Total Revenue
                </p>
                <p :class="['text-lg font-bold text-green-500']">
                  ${{ item.revenue.toLocaleString() }}
                </p>
              </div>

              <div :class="['p-4 rounded-lg', darkMode ? 'bg-gray-700' : 'bg-gray-50']">
                <p :class="['text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Joined Date
                </p>
                <p :class="['text-lg font-bold', darkMode ? 'text-white' : 'text-gray-900']">
                  {{ item.joined }}
                </p>
              </div>
            </div>
          </div>

          <!-- Product View -->
          <div v-if="type === 'product'" class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                {{ item.name.charAt(0) }}
              </div>
              <div class="flex-1 min-w-0">
                <h3 :class="['text-xl sm:text-2xl font-bold truncate', darkMode ? 'text-white' : 'text-gray-900']">
                  {{ item.name }}
                </h3>
                <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  {{ item.description }}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div :class="['p-4 rounded-lg', darkMode ? 'bg-gray-700' : 'bg-gray-50']">
                <p :class="['text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Price
                </p>
                <p :class="['text-2xl font-bold', darkMode ? 'text-white' : 'text-gray-900']">
                  ${{ item.price }}
                </p>
              </div>

              <div :class="['p-4 rounded-lg', darkMode ? 'bg-gray-700' : 'bg-gray-50']">
                <p :class="['text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Status
                </p>
                <span 
                  class="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                >
                  {{ item.status }}
                </span>
              </div>

              <div :class="['p-4 rounded-lg', darkMode ? 'bg-gray-700' : 'bg-gray-50']">
                <p :class="['text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Total Sales
                </p>
                <p :class="['text-lg font-bold', darkMode ? 'text-white' : 'text-gray-900']">
                  {{ item.sales }}
                </p>
              </div>

              <div :class="['p-4 rounded-lg', darkMode ? 'bg-gray-700' : 'bg-gray-50']">
                <p :class="['text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Total Revenue
                </p>
                <p :class="['text-lg font-bold text-green-500']">
                  ${{ item.revenue.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <button 
              @click="close"
              class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app'

const props = defineProps({
  isOpen: Boolean,
  item: Object,
  type: String,
  title: String
})

const emit = defineEmits(['close'])

const store = useAppStore()
const darkMode = computed(() => store.darkMode)

const close = () => {
  emit('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
