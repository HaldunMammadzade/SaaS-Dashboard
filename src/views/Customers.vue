<template>
  <div class="customers">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <div>
        <h1 :class="['text-2xl sm:text-3xl font-bold mb-2', darkMode ? 'text-white' : 'text-gray-900']">
          Customers
        </h1>
        <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
          Manage your customer base and relationships
        </p>
      </div>
      <button 
        @click="showAddModal = true"
        class="flex items-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        <span class="hidden sm:inline">Add Customer</span>
        <span class="sm:hidden">Add</span>
      </button>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <div 
        v-for="(stat, idx) in customerStats" 
        :key="idx"
        :class="[
          'rounded-xl p-4 sm:p-6 border shadow-sm',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
      >
        <div class="flex items-center gap-3 sm:gap-4">
          <div 
            :class="[
              'w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0',
              stat.bg
            ]"
          >
            <component :is="stat.icon" class="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          </div>
          <div class="min-w-0">
            <p :class="['text-xs sm:text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600']">
              {{ stat.label }}
            </p>
            <p :class="['text-lg sm:text-2xl font-bold truncate', darkMode ? 'text-white' : 'text-gray-900']">
              {{ stat.value }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div 
      :class="[
        'rounded-xl p-4 sm:p-6 border shadow-sm mb-6',
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      ]"
    >
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex-1 relative">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input 
            type="text"
            v-model="searchQuery"
            placeholder="Search customers..."
            :class="[
              'w-full pl-10 pr-4 py-3 rounded-lg border transition-all',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            ]"
          />
        </div>
        
        <div class="flex gap-3">
          <select 
            v-model="filterPlan"
            :class="[
              'flex-1 sm:flex-none px-4 py-3 rounded-lg border text-sm font-medium cursor-pointer transition-colors',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            ]"
          >
            <option value="all">All Plans</option>
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
          </select>

          <select 
            v-model="filterStatus"
            :class="[
              'flex-1 sm:flex-none px-4 py-3 rounded-lg border text-sm font-medium cursor-pointer transition-colors',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            ]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Customers Table -->
    <div 
      :class="[
        'rounded-xl border shadow-sm overflow-hidden',
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      ]"
    >
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead :class="darkMode ? 'bg-gray-700' : 'bg-gray-50'">
            <tr>
              <th :class="['text-left py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Customer
              </th>
              <th :class="['hidden md:table-cell text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Plan
              </th>
              <th :class="['hidden lg:table-cell text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Revenue
              </th>
              <th :class="['text-left py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Status
              </th>
              <th :class="['text-left py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="customer in filteredCustomers" 
              :key="customer.id"
              :class="[
                'border-t transition-colors',
                darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-100 hover:bg-gray-50'
              ]"
            >
              <td class="py-4 px-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                    {{ customer.name.charAt(0) }}
                  </div>
                  <div class="min-w-0">
                    <p :class="['font-semibold text-xs sm:text-sm truncate', darkMode ? 'text-white' : 'text-gray-900']">
                      {{ customer.name }}
                    </p>
                    <p :class="['text-xs truncate', darkMode ? 'text-gray-400' : 'text-gray-500']">
                      {{ customer.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="hidden md:table-cell py-4 px-6">
                <span 
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    customer.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                    customer.plan === 'Pro' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  ]"
                >
                  {{ customer.plan }}
                </span>
              </td>
              <td :class="['hidden lg:table-cell py-4 px-6 font-bold', darkMode ? 'text-white' : 'text-gray-900']">
                ${{ customer.revenue.toLocaleString() }}
              </td>
              <td class="py-4 px-4 sm:px-6">
                <div class="flex items-center gap-2">
                  <div 
                    :class="[
                      'w-2 h-2 rounded-full',
                      customer.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    ]"
                  ></div>
                  <span 
                    :class="[
                      'text-xs sm:text-sm font-medium capitalize',
                      customer.status === 'active' 
                        ? darkMode ? 'text-green-400' : 'text-green-600'
                        : darkMode ? 'text-gray-400' : 'text-gray-500'
                    ]"
                  >
                    {{ customer.status }}
                  </span>
                </div>
              </td>
              <td class="py-4 px-4 sm:px-6">
                <div class="flex items-center gap-1 sm:gap-2">
                  <button 
                    @click="viewCustomer(customer)"
                    :class="[
                      'p-1.5 sm:p-2 rounded-lg transition-colors',
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    ]"
                    title="View"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button 
                    @click="confirmDelete(customer)"
                    :class="[
                      'p-1.5 sm:p-2 rounded-lg transition-colors text-red-500',
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    ]"
                    title="Delete"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div 
        :class="[
          'flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-t gap-4',
          darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
        ]"
      >
        <p :class="['text-xs sm:text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
          Showing <span class="font-semibold">{{ filteredCustomers.length }}</span> of <span class="font-semibold">{{ customers.length }}</span> customers
        </p>
        <div class="flex gap-2">
          <button 
            :class="[
              'px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors',
              darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border'
            ]"
          >
            Previous
          </button>
          <button 
            :class="[
              'px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors',
              darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border'
            ]"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Add Customer Modal -->
    <AddCustomerModal :is-open="showAddModal" @close="showAddModal = false" />

    <!-- Delete Confirmation Modal -->
    <transition name="fade">
      <div 
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        @click.self="showDeleteModal = false"
      >
        <div 
          :class="[
            'w-full max-w-md rounded-xl shadow-2xl p-6',
            darkMode ? 'bg-gray-800' : 'bg-white'
          ]"
        >
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30">
            <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <h3 :class="['text-xl font-bold text-center mb-2', darkMode ? 'text-white' : 'text-gray-900']">
            Delete Customer
          </h3>
          <p :class="['text-center mb-6', darkMode ? 'text-gray-400' : 'text-gray-600']">
            Are you sure you want to delete <strong>{{ customerToDelete?.name }}</strong>? This action cannot be undone.
          </p>
          <div class="flex gap-3">
            <button 
              @click="showDeleteModal = false"
              :class="[
                'flex-1 px-4 py-3 rounded-lg font-semibold transition-colors',
                darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              ]"
            >
              Cancel
            </button>
            <button 
              @click="deleteCustomer"
              class="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../stores/app'
import AddCustomerModal from '../components/AddCustomerModal.vue'
import {
  Users as UsersIcon,
  DollarSign as DollarIcon,
  TrendingUp as TrendingUpIcon,
  UserCheck as UserCheckIcon
} from 'lucide-vue-next'

const store = useAppStore()
const darkMode = computed(() => store.darkMode)
const customers = computed(() => store.customers)

const searchQuery = ref('')
const filterPlan = ref('all')
const filterStatus = ref('all')
const showAddModal = ref(false)
const showDeleteModal = ref(false)
const customerToDelete = ref(null)

const customerStats = computed(() => [
  {
    label: 'Total Customers',
    value: customers.value.length,
    icon: UsersIcon,
    bg: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    label: 'Active',
    value: customers.value.filter(c => c.status === 'active').length,
    icon: UserCheckIcon,
    bg: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    label: 'Total Revenue',
    value: '$' + customers.value.reduce((sum, c) => sum + c.revenue, 0).toLocaleString(),
    icon: DollarIcon,
    bg: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    label: 'Growth',
    value: '+12.5%',
    icon: TrendingUpIcon,
    bg: 'bg-gradient-to-br from-pink-500 to-pink-600'
  }
])

const filteredCustomers = computed(() => {
  return customers.value.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesPlan = filterPlan.value === 'all' || customer.plan === filterPlan.value
    const matchesStatus = filterStatus.value === 'all' || customer.status === filterStatus.value
    
    return matchesSearch && matchesPlan && matchesStatus
  })
})

const viewCustomer = (customer) => {
  alert(`Viewing customer: ${customer.name}\nEmail: ${customer.email}\nPlan: ${customer.plan}`)
}

const confirmDelete = (customer) => {
  customerToDelete.value = customer
  showDeleteModal.value = true
}

const deleteCustomer = () => {
  if (customerToDelete.value) {
    store.deleteCustomer(customerToDelete.value.id)
    showDeleteModal.value = false
    customerToDelete.value = null
  }
}
</script>
