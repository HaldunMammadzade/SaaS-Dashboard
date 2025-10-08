<template>
  <div class="products">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 :class="['text-3xl font-bold mb-2', darkMode ? 'text-white' : 'text-gray-900']">
          Products
        </h1>
        <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
          Manage your product catalog and pricing
        </p>
      </div>
      <button 
        class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
      >
        <component :is="PlusIcon" class="w-5 h-5" />
        Add Product
      </button>
    </div>

    <!-- Product Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div 
        v-for="(stat, idx) in productStats" 
        :key="idx"
        :class="[
          'rounded-xl p-6 border shadow-sm hover:shadow-lg transition-all duration-300',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
      >
        <div class="flex items-center justify-between mb-4">
          <div 
            :class="[
              'w-12 h-12 rounded-xl flex items-center justify-center',
              stat.bg
            ]"
          >
            <component :is="stat.icon" class="w-6 h-6 text-white" />
          </div>
          <span :class="['text-xs font-semibold', stat.trend === 'up' ? 'text-green-500' : 'text-red-500']">
            {{ stat.change }}
          </span>
        </div>
        <p :class="['text-sm font-medium mb-2', darkMode ? 'text-gray-400' : 'text-gray-600']">
          {{ stat.label }}
        </p>
        <p :class="['text-2xl font-bold', darkMode ? 'text-white' : 'text-gray-900']">
          {{ stat.value }}
        </p>
      </div>
    </div>

    <!-- View Toggle and Filters -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex gap-2">
        <button 
          @click="viewMode = 'grid'"
          :class="[
            'px-4 py-2 rounded-lg transition-colors flex items-center gap-2',
            viewMode === 'grid' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
              : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          <component :is="GridIcon" class="w-4 h-4" />
          Grid
        </button>
        <button 
          @click="viewMode = 'list'"
          :class="[
            'px-4 py-2 rounded-lg transition-colors flex items-center gap-2',
            viewMode === 'list' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
              : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          <component :is="ListIcon" class="w-4 h-4" />
          List
        </button>
      </div>

      <div class="flex gap-3">
        <div class="relative">
          <component :is="SearchIcon" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            v-model="searchQuery"
            placeholder="Search products..."
            :class="[
              'pl-10 pr-4 py-2 rounded-lg border transition-all w-64',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            ]"
          />
        </div>

        <select 
          v-model="sortBy"
          :class="[
            'px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors',
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
          ]"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="sales">Sales</option>
          <option value="revenue">Revenue</option>
        </select>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id"
        :class="[
          'rounded-xl p-6 border shadow-sm hover:shadow-xl transition-all duration-300 card-hover cursor-pointer',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
      >
        <div class="flex items-start justify-between mb-4">
          <div 
            class="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold"
          >
            {{ product.name.charAt(0) }}
          </div>
          <div class="flex gap-2">
            <button 
              :class="[
                'p-2 rounded-lg transition-colors',
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              ]"
            >
              <component :is="EditIcon" class="w-4 h-4" />
            </button>
            <button 
              :class="[
                'p-2 rounded-lg transition-colors',
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              ]"
            >
              <component :is="MoreIcon" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 :class="['text-xl font-bold mb-2', darkMode ? 'text-white' : 'text-gray-900']">
          {{ product.name }}
        </h3>
        <p :class="['text-sm mb-4', darkMode ? 'text-gray-400' : 'text-gray-600']">
          {{ product.description }}
        </p>

        <div class="flex items-center justify-between mb-4">
          <div>
            <p :class="['text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600']">
              Price
            </p>
            <p :class="['text-2xl font-bold', darkMode ? 'text-white' : 'text-gray-900']">
              ${{ product.price }}
            </p>
          </div>
          <span 
            class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          >
            {{ product.status }}
          </span>
        </div>

        <div class="space-y-3 pt-4 border-t" :class="darkMode ? 'border-gray-700' : 'border-gray-100'">
          <div class="flex items-center justify-between">
            <span :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
              Total Sales
            </span>
            <span :class="['text-sm font-bold', darkMode ? 'text-white' : 'text-gray-900']">
              {{ product.sales }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
              Revenue
            </span>
            <span :class="['text-sm font-bold text-green-500']">
              ${{ product.revenue.toLocaleString() }}
            </span>
          </div>
        </div>

        <div class="mt-4 w-full h-2 rounded-full overflow-hidden" :class="darkMode ? 'bg-gray-700' : 'bg-gray-100'">
          <div 
            class="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
            :style="{ width: `${(product.sales / 1000) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div 
      v-else
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
                Product
              </th>
              <th :class="['text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Price
              </th>
              <th :class="['text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Sales
              </th>
              <th :class="['text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Revenue
              </th>
              <th :class="['text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Status
              </th>
              <th :class="['text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="product in filteredProducts" 
              :key="product.id"
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
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {{ product.name.charAt(0) }}
                  </div>
                  <div>
                    <p :class="['font-semibold text-sm', darkMode ? 'text-white' : 'text-gray-900']">
                      {{ product.name }}
                    </p>
                    <p :class="['text-xs', darkMode ? 'text-gray-400' : 'text-gray-500']">
                      {{ product.description }}
                    </p>
                  </div>
                </div>
              </td>
              <td :class="['py-4 px-6 font-bold text-lg', darkMode ? 'text-white' : 'text-gray-900']">
                ${{ product.price }}
              </td>
              <td :class="['py-4 px-6 font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                {{ product.sales }}
              </td>
              <td :class="['py-4 px-6 font-bold text-green-500']">
                ${{ product.revenue.toLocaleString() }}
              </td>
              <td class="py-4 px-6">
                <span 
                  class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                >
                  {{ product.status }}
                </span>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <button 
                    :class="[
                      'p-2 rounded-lg transition-colors',
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    <component :is="EyeIcon" class="w-4 h-4" />
                  </button>
                  <button 
                    :class="[
                      'p-2 rounded-lg transition-colors',
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    <component :is="EditIcon" class="w-4 h-4" />
                  </button>
                  <button 
                    :class="[
                      'p-2 rounded-lg transition-colors text-red-500',
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    <component :is="TrashIcon" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../stores/app'
import {
  Package as PackageIcon,
  DollarSign as DollarIcon,
  ShoppingCart as CartIcon,
  TrendingUp as TrendingUpIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
  Grid3x3 as GridIcon,
  List as ListIcon,
  Eye as EyeIcon,
  Edit as EditIcon,
  Trash2 as TrashIcon,
  MoreVertical as MoreIcon
} from 'lucide-vue-next'

const store = useAppStore()
const darkMode = computed(() => store.darkMode)
const products = computed(() => store.products)

const viewMode = ref('grid')
const searchQuery = ref('')
const sortBy = ref('name')

const productStats = [
  {
    label: 'Total Products',
    value: products.value.length,
    change: '+3',
    trend: 'up',
    icon: PackageIcon,
    bg: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    label: 'Total Sales',
    value: products.value.reduce((sum, p) => sum + p.sales, 0).toLocaleString(),
    change: '+18%',
    trend: 'up',
    icon: CartIcon,
    bg: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    label: 'Total Revenue',
    value: '$' + products.value.reduce((sum, p) => sum + p.revenue, 0).toLocaleString(),
    change: '+12%',
    trend: 'up',
    icon: DollarIcon,
    bg: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    label: 'Avg. Price',
    value: '$' + Math.round(products.value.reduce((sum, p) => sum + p.price, 0) / products.value.length),
    change: '+5%',
    trend: 'up',
    icon: TrendingUpIcon,
    bg: 'bg-gradient-to-br from-pink-500 to-pink-600'
  }
]

const filteredProducts = computed(() => {
  let filtered = products.value.filter(product => 
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  if (sortBy.value === 'price') {
    filtered = filtered.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'sales') {
    filtered = filtered.sort((a, b) => b.sales - a.sales)
  } else if (sortBy.value === 'revenue') {
    filtered = filtered.sort((a, b) => b.revenue - a.revenue)
  }

  return filtered
})
</script>
