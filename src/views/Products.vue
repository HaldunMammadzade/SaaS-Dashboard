<template>
  <div class="products">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <div>
        <h1 :class="['text-2xl sm:text-3xl font-bold mb-2', darkMode ? 'text-white' : 'text-gray-900']">
          Products
        </h1>
        <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
          Manage your product catalog and pricing
        </p>
      </div>
      <button 
        @click="showAddModal = true"
        class="flex items-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        <span class="hidden sm:inline">Add Product</span>
        <span class="sm:hidden">Add</span>
      </button>
    </div>

    <!-- Product Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <div 
        v-for="(stat, idx) in productStats" 
        :key="idx"
        :class="[
          'rounded-xl p-4 sm:p-6 border shadow-sm hover:shadow-lg transition-all duration-300',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
      >
        <div class="flex items-center justify-between mb-4">
          <div 
            :class="[
              'w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center',
              stat.bg
            ]"
          >
            <component :is="stat.icon" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span :class="['text-xs font-semibold', stat.trend === 'up' ? 'text-green-500' : 'text-red-500']">
            {{ stat.change }}
          </span>
        </div>
        <p :class="['text-xs sm:text-sm font-medium mb-2', darkMode ? 'text-gray-400' : 'text-gray-600']">
          {{ stat.label }}
        </p>
        <p :class="['text-lg sm:text-2xl font-bold', darkMode ? 'text-white' : 'text-gray-900']">
          {{ stat.value }}
        </p>
      </div>
    </div>

    <!-- View Toggle and Filters -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 gap-4">
      <div class="flex gap-2">
        <button 
          @click="viewMode = 'grid'"
          :class="[
            'flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2',
            viewMode === 'grid' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
              : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
          </svg>
          <span class="text-sm font-medium">Grid</span>
        </button>
        <button 
          @click="viewMode = 'list'"
          :class="[
            'flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2',
            viewMode === 'list' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
              : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <span class="text-sm font-medium">List</span>
        </button>
      </div>

      <div class="flex gap-3">
        <div class="relative flex-1 sm:flex-none">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input 
            type="text"
            v-model="searchQuery"
            placeholder="Search..."
            :class="[
              'w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border transition-all',
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
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id"
        :class="[
          'rounded-xl p-4 sm:p-6 border shadow-sm hover:shadow-xl transition-all duration-300 card-hover cursor-pointer',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
      >
        <div class="flex items-start justify-between mb-4">
          <div 
            class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold"
          >
            {{ product.name.charAt(0) }}
          </div>
          <div class="flex gap-2">
            <button 
              @click="viewProduct(product)"
              :class="[
                'p-2 rounded-lg transition-colors',
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              ]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
            <button 
              @click="confirmDelete(product)"
              :class="[
                'p-2 rounded-lg transition-colors text-red-500',
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              ]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>

        <h3 :class="['text-lg sm:text-xl font-bold mb-2', darkMode ? 'text-white' : 'text-gray-900']">
          {{ product.name }}
        </h3>
        <p :class="['text-xs sm:text-sm mb-4 line-clamp-2', darkMode ? 'text-gray-400' : 'text-gray-600']">
          {{ product.description }}
        </p>

        <div class="flex items-center justify-between mb-4">
          <div>
            <p :class="['text-xs sm:text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600']">
              Price
            </p>
            <p :class="['text-xl sm:text-2xl font-bold', darkMode ? 'text-white' : 'text-gray-900']">
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
            <span :class="['text-xs sm:text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
              Total Sales
            </span>
            <span :class="['text-xs sm:text-sm font-bold', darkMode ? 'text-white' : 'text-gray-900']">
              {{ product.sales }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span :class="['text-xs sm:text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
              Revenue
            </span>
            <span :class="['text-xs sm:text-sm font-bold text-green-500']">
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
              <th :class="['text-left py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Product
              </th>
              <th :class="['hidden md:table-cell text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Price
              </th>
              <th :class="['hidden lg:table-cell text-left py-4 px-6 text-sm font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                Sales
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
              v-for="product in filteredProducts" 
              :key="product.id"
              :class="[
                'border-t transition-colors',
                darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-100 hover:bg-gray-50'
              ]"
            >
              <td class="py-4 px-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0">
                    {{ product.name.charAt(0) }}
                  </div>
                  <div class="min-w-0">
                    <p :class="['font-semibold text-xs sm:text-sm truncate', darkMode ? 'text-white' : 'text-gray-900']">
                      {{ product.name }}
                    </p>
                    <p :class="['text-xs truncate', darkMode ? 'text-gray-400' : 'text-gray-500']">
                      {{ product.description }}
                    </p>
                  </div>
                </div>
              </td>
              <td :class="['hidden md:table-cell py-4 px-6 font-bold text-lg', darkMode ? 'text-white' : 'text-gray-900']">
                ${{ product.price }}
              </td>
              <td :class="['hidden lg:table-cell py-4 px-6 font-semibold', darkMode ? 'text-gray-300' : 'text-gray-700']">
                {{ product.sales }}
              </td>
              <td :class="['hidden lg:table-cell py-4 px-6 font-bold text-green-500']">
                ${{ product.revenue.toLocaleString() }}
              </td>
              <td class="py-4 px-4 sm:px-6">
                <span 
                  class="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                >
                  {{ product.status }}
                </span>
              </td>
              <td class="py-4 px-4 sm:px-6">
                <div class="flex items-center gap-1 sm:gap-2">
                  <button 
                    @click="viewProduct(product)"
                    :class="[
                      'p-1.5 sm:p-2 rounded-lg transition-colors',
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button 
                    @click="confirmDelete(product)"
                    :class="[
                      'p-1.5 sm:p-2 rounded-lg transition-colors text-red-500',
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    ]"
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
    </div>

    <!-- Add Product Modal -->
    <AddProductModal :is-open="showAddModal" @close="showAddModal = false" />

    <!-- View Modal -->
    <ViewModal 
      :is-open="showViewModal" 
      :item="selectedProduct" 
      type="product"
      title="Product Details"
      @close="showViewModal = false" 
    />

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
            Delete Product
          </h3>
          <p :class="['text-center mb-6', darkMode ? 'text-gray-400' : 'text-gray-600']">
            Are you sure you want to delete <strong>{{ productToDelete?.name }}</strong>? This action cannot be undone.
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
              @click="deleteProduct"
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
import AddProductModal from '../components/AddProductModal.vue'
import ViewModal from '../components/ViewModal.vue'
import {
  Package as PackageIcon,
  DollarSign as DollarIcon,
  ShoppingCart as CartIcon,
  TrendingUp as TrendingUpIcon
} from 'lucide-vue-next'

const store = useAppStore()
const darkMode = computed(() => store.darkMode)
const products = computed(() => store.products)

const viewMode = ref('grid')
const searchQuery = ref('')
const sortBy = ref('name')
const showAddModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const selectedProduct = ref(null)
const productToDelete = ref(null)

const productStats = computed(() => [
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
])

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

const viewProduct = (product) => {
  selectedProduct.value = product
  showViewModal.value = true
}

const confirmDelete = (product) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const deleteProduct = () => {
  if (productToDelete.value) {
    store.deleteProduct(productToDelete.value.id)
    showDeleteModal.value = false
    productToDelete.value = null
  }
}
</script>
