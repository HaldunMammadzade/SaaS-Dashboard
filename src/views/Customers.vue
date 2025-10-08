<template>
  <div class="customers">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 :class="['text-3xl font-bold mb-2', darkMode ? 'text-white' : 'text-gray-900']">
          Customers
        </h1>
        <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
          Manage your customer base and relationships
        </p>
      </div>
      <button 
        class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
      >
        <component :is="PlusIcon" class="w-5 h-5" />
        Add Customer
      </button>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div 
        v-for="(stat, idx) in customerStats" 
        :key="idx"
        :class="[
          'rounded-xl p-6 border shadow-sm',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
      >
        <div class="flex items-center gap-4">
          <div 
            :class="[
              'w-14 h-14 rounded-xl flex items-center justify-center',
              stat.bg
            ]"
          >
            <component :is="stat.icon" class="w-7 h-7 text-white" />
          </div>
          <div>
            <p :class="['text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600']">
              {{ stat.label }}
            </p>
            <p :class="['text-2xl font-bold', darkMode ? 'text-white' : 'text-gray-900']">
              {{ stat.value }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div 
      :class="[
        'rounded-xl p-6 border shadow-sm mb-6',
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      ]"
    >
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 relative">
          <component :is="SearchIcon" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            v-model="searchQuery"
            placeholder="Search customers by name, email..."
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
              'px-4 py-3 rounded-lg border text-sm font-medium cursor-pointer transition-colors',
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
              'px-4 py-3 rounded-lg border text-sm font-medium cursor-pointer transition-colors',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            ]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button 
            :class="[
              'px-4 py-3 rounded-lg transition-colors flex items-center gap-2',
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            ]"
          >
            <component :is="FilterIcon" class="w-5 h-5" />
          </button>
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
              <th :class="['text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                <input type="checkbox" class="w-4 h-4 rounded" />
              </th>
              <th :class="['text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Customer
              </th>
              <th :class="['text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Plan
              </th>
              <th :class="['text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Revenue
              </th>
              <th :class="['text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Status
              </th>
              <th :class="['text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Joined
              </th>
              <th :class="['text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
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
              <td class="py-4 px-6">
                <input type="checkbox" class="w-4 h-4 rounded" />
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {{ customer.name.charAt(0) }}
                  </div>
                  <div>
                    <p :class="['font-semibold text-sm', darkMode ? 'text-white' : 'text-gray-900']">
                      {{ customer.name }}
                    </p>
                    <p :class="['text-xs', darkMode ? 'text-gray-400' : 'text-gray-500']">
                      {{ customer.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
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
              <td :class="['py-4 px-6 font-bold', darkMode ? 'text-white' : 'text-gray-900']">
                ${{ customer.revenue.toLocaleString() }}
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <div 
                    :class="[
                      'w-2 h-2 rounded-full',
                      customer.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    ]"
                  ></div>
                  <span 
                    :class="[
                      'text-sm font-medium capitalize',
                      customer.status === 'active' 
                        ? darkMode ? 'text-green-400' : 'text-green-600'
                        : darkMode ? 'text-gray-400' : 'text-gray-500'
                    ]"
                  >
                    {{ customer.status }}
                  </span>
                </div>
              </td>
              <td :class="['py-4 px-6 text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
                {{ customer.joined }}
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <button 
                    :class="[
                      'p-2 rounded-lg transition-colors',
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    ]"
                    title="View"
                  >
                    <component :is="EyeIcon" class="w-4 h-4" />
                  </button>
                  <button 
                    :class="[
                      'p-2 rounded-lg transition-colors',
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    ]"
                    title="Edit"
                  >
                    <component :is="EditIcon" class="w-4 h-4" />
                  </button>
                  <button 
                    :class="[
                      'p-2 rounded-lg transition-colors text-red-500',
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    ]"
                    title="Delete"
                  >
                    <component :is="TrashIcon" class="w-4 h-4" />
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
          'flex items-center justify-between px-6 py-4 border-t',
          darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
        ]"
      >
        <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
          Showing <span class="font-semibold">1-{{ filteredCustomers.length }}</span> of <span class="font-semibold">{{ customers.length }}</span> customers
        </p>
        <div class="flex gap-2">
          <button 
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border'
            ]"
          >
            Previous
          </button>
          <button 
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border'
            ]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../stores/app'
import {
  Users as UsersIcon,
  DollarSign as DollarIcon,
  TrendingUp as TrendingUpIcon,
  UserCheck as UserCheckIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  Eye as EyeIcon,
  Edit as EditIcon,
  Trash2 as TrashIcon
} from 'lucide-vue-next'

const store = useAppStore()
const darkMode = computed(() => store.darkMode)
const customers = computed(() => store.customers)

const searchQuery = ref('')
const filterPlan = ref('all')
const filterStatus = ref('all')

const customerStats = [
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
]

const filteredCustomers = computed(() => {
  return customers.value.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesPlan = filterPlan.value === 'all' || customer.plan === filterPlan.value
    const matchesStatus = filterStatus.value === 'all' || customer.status === filterStatus.value
    
    return matchesSearch && matchesPlan && matchesStatus
  })
})
</script>
