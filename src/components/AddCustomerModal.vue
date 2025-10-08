<template>
  <transition name="fade">
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      @click.self="close"
    >
      <div 
        :class="[
          'w-full max-w-2xl rounded-xl shadow-2xl',
          darkMode ? 'bg-gray-800' : 'bg-white'
        ]"
      >
        <div class="p-6 border-b" :class="darkMode ? 'border-gray-700' : 'border-gray-200'">
          <div class="flex items-center justify-between">
            <h2 :class="['text-2xl font-bold', darkMode ? 'text-white' : 'text-gray-900']">
              Add New Customer
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

        <div class="p-6">
          <form @submit.prevent="saveCustomer">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700']">
                  Full Name *
                </label>
                <input 
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="John Doe"
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
                  Email Address *
                </label>
                <input 
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="john@example.com"
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
                  Plan *
                </label>
                <select 
                  v-model="form.plan"
                  required
                  :class="[
                    'w-full px-4 py-3 rounded-lg border transition-all',
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  ]"
                >
                  <option value="Basic">Basic</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700']">
                  Status *
                </label>
                <select 
                  v-model="form.status"
                  required
                  :class="[
                    'w-full px-4 py-3 rounded-lg border transition-all',
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  ]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button 
                type="button"
                @click="close"
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
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../stores/app'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const store = useAppStore()
const darkMode = computed(() => store.darkMode)

const form = ref({
  name: '',
  email: '',
  plan: 'Basic',
  status: 'active'
})

const close = () => {
  emit('close')
}

const saveCustomer = () => {
  store.addCustomer(form.value)
  form.value = {
    name: '',
    email: '',
    plan: 'Basic',
    status: 'active'
  }
  close()
}
</script>
