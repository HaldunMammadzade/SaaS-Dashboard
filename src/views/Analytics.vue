<template>
  <div class="analytics">
    <div class="mb-6 sm:mb-8">
      <h1 :class="['text-2xl sm:text-3xl font-bold mb-2', darkMode ? 'text-white' : 'text-gray-900']">
        Analytics & Reports
      </h1>
      <p :class="['text-xs sm:text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
        Detailed insights and performance metrics
      </p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      <div 
        v-for="(metric, idx) in quickMetrics" 
        :key="idx"
        :class="[
          'rounded-xl p-4 sm:p-6 border shadow-sm hover:shadow-lg transition-all duration-300',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
      >
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <div 
            :class="[
              'w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center',
              metric.bg
            ]"
          >
            <component :is="metric.icon" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span :class="['text-xs font-semibold', metric.changeColor]">
            {{ metric.change }}
          </span>
        </div>
        <h3 :class="['text-lg sm:text-2xl font-bold mb-1', darkMode ? 'text-white' : 'text-gray-900']">
          {{ metric.value }}
        </h3>
        <p :class="['text-xs sm:text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
          {{ metric.label }}
        </p>
      </div>
    </div>

    <!-- Revenue vs Expenses -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <ChartCard
        title="Revenue vs Expenses"
        subtitle="Comparison over 6 months"
        :height="isMobile ? '250px' : '400px'"
        :show-legend="true"
        :legend-items="[
          { label: 'Revenue', color: '#3b82f6' },
          { label: 'Expenses', color: '#ef4444' }
        ]"
      >
        <div class="w-full h-full flex items-end justify-center gap-2 sm:gap-4 px-4 sm:px-8">
          <div 
            v-for="(month, idx) in revenueData" 
            :key="idx"
            class="flex-1 flex flex-col items-center"
          >
            <div class="w-full flex gap-1 sm:gap-2 items-end justify-center" :style="{ height: isMobile ? '200px' : '350px' }">
              <div 
                class="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative group"
                :style="{
                  height: `${(month.revenue / 10000) * 100}%`,
                  background: 'linear-gradient(to top, #3b82f6, #60a5fa)'
                }"
              >
                <div 
                  class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
                >
                  ${{ month.revenue.toLocaleString() }}
                </div>
              </div>
              <div 
                class="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative group"
                :style="{
                  height: `${(month.expenses / 10000) * 100}%`,
                  background: 'linear-gradient(to top, #ef4444, #f87171)'
                }"
              >
                <div 
                  class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
                >
                  ${{ month.expenses.toLocaleString() }}
                </div>
              </div>
            </div>
            <span :class="['text-xs mt-2 sm:mt-3 font-medium', darkMode ? 'text-gray-400' : 'text-gray-600']">
              {{ month.month }}
            </span>
          </div>
        </div>
      </ChartCard>

      <!-- Profit Margin -->
      <ChartCard
        title="Profit Margin Trend"
        subtitle="Monthly profit analysis"
        :height="isMobile ? '250px' : '400px'"
      >
        <div class="w-full h-full flex items-center justify-center p-4 sm:p-8">
          <svg class="w-full h-full" viewBox="0 0 600 350" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="profitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.3" />
                <stop offset="100%" style="stop-color:#10b981;stop-opacity:0" />
              </linearGradient>
            </defs>
            
            <g v-for="i in 5" :key="i">
              <line 
                x1="50" 
                :y1="50 + (i - 1) * 60"
                x2="550" 
                :y2="50 + (i - 1) * 60"
                :stroke="darkMode ? '#374151' : '#e5e7eb'"
                stroke-width="1"
                stroke-dasharray="5,5"
              />
            </g>
            
            <g v-for="(point, idx) in profitChartPoints" :key="idx">
              <line 
                v-if="idx < profitChartPoints.length - 1"
                :x1="point.x" 
                :y1="point.y" 
                :x2="profitChartPoints[idx + 1].x" 
                :y2="profitChartPoints[idx + 1].y"
                stroke="#10b981"
                stroke-width="4"
                stroke-linecap="round"
              />
            </g>
            
            <polygon 
              :points="profitAreaPoints"
              fill="url(#profitGradient)"
            />
            
            <g v-for="(point, idx) in profitChartPoints" :key="'dot-' + idx">
              <circle 
                :cx="point.x" 
                :cy="point.y" 
                r="6"
                fill="#10b981"
                class="cursor-pointer transition-all"
              />
              <circle 
                :cx="point.x" 
                :cy="point.y" 
                r="3"
                fill="white"
              />
            </g>
            
            <g v-for="(month, idx) in revenueData" :key="'label-' + idx">
              <text 
                :x="50 + idx * 85" 
                y="320"
                :class="darkMode ? 'fill-gray-400' : 'fill-gray-600'"
                text-anchor="middle"
                font-size="12"
                font-weight="500"
              >
                {{ month.month }}
              </text>
            </g>
          </svg>
        </div>
      </ChartCard>
    </div>

    <!-- Performance Metrics -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <div 
        v-for="(performance, idx) in performanceMetrics" 
        :key="idx"
        :class="[
          'rounded-xl p-4 sm:p-6 border shadow-sm',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 :class="['text-base sm:text-lg font-bold', darkMode ? 'text-white' : 'text-gray-900']">
            {{ performance.title }}
          </h3>
          <component 
            :is="performance.icon" 
            :class="['w-4 h-4 sm:w-5 sm:h-5', performance.iconColor]"
          />
        </div>
        
        <div class="mb-4 sm:mb-6">
          <div class="flex items-end gap-2 mb-2">
            <span :class="['text-2xl sm:text-3xl font-bold', darkMode ? 'text-white' : 'text-gray-900']">
              {{ performance.value }}
            </span>
            <span :class="['text-xs sm:text-sm mb-1', darkMode ? 'text-gray-400' : 'text-gray-600']">
              {{ performance.unit }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <component 
              :is="performance.trend === 'up' ? TrendingUpIcon : TrendingDownIcon"
              :class="[
                'w-3 h-3 sm:w-4 sm:h-4',
                performance.trend === 'up' ? 'text-green-500' : 'text-red-500'
              ]"
            />
            <span :class="[
              'text-xs sm:text-sm font-semibold',
              performance.trend === 'up' ? 'text-green-500' : 'text-red-500'
            ]">
              {{ performance.change }}
            </span>
            <span :class="['text-xs', darkMode ? 'text-gray-500' : 'text-gray-400']">
              vs last month
            </span>
          </div>
        </div>

        <div class="space-y-3">
          <div 
            v-for="(item, itemIdx) in performance.breakdown" 
            :key="itemIdx"
          >
            <div class="flex items-center justify-between mb-2">
              <span :class="['text-xs sm:text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
                {{ item.label }}
              </span>
              <span :class="['text-xs sm:text-sm font-semibold', darkMode ? 'text-white' : 'text-gray-900']">
                {{ item.value }}%
              </span>
            </div>
            <div class="w-full h-2 rounded-full overflow-hidden" :class="darkMode ? 'bg-gray-700' : 'bg-gray-100'">
              <div 
                class="h-full rounded-full transition-all duration-700"
                :class="item.color"
                :style="{ width: `${item.value}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Products Table -->
    <div 
      :class="[
        'rounded-xl p-4 sm:p-6 border shadow-sm',
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      ]"
    >
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <h3 :class="['text-base sm:text-lg font-bold', darkMode ? 'text-white' : 'text-gray-900']">
          Top Performing Products
        </h3>
        <button 
          :class="[
            'px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto',
            darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          ]"
        >
          Export
        </button>
      </div>

      <div class="overflow-x-auto -mx-4 sm:mx-0">
        <div class="inline-block min-w-full align-middle">
          <table class="min-w-full">
            <thead>
              <tr :class="[darkMode ? 'border-gray-700' : 'border-gray-200']" class="border-b">
                <th :class="['text-left py-3 px-4 text-xs sm:text-sm font-semibold', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Product
                </th>
                <th :class="['hidden sm:table-cell text-left py-3 px-4 text-sm font-semibold', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Price
                </th>
                <th :class="['text-left py-3 px-4 text-xs sm:text-sm font-semibold', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Sales
                </th>
                <th :class="['text-left py-3 px-4 text-xs sm:text-sm font-semibold', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Revenue
                </th>
                <th :class="['hidden md:table-cell text-left py-3 px-4 text-sm font-semibold', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="product in products" 
                :key="product.id"
                :class="[
                  'border-b transition-colors',
                  darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                ]"
              >
                <td class="py-3 sm:py-4 px-4">
                  <div class="flex items-center gap-2 sm:gap-3">
                    <div 
                      class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs sm:text-base flex-shrink-0"
                    >
                      {{ product.name.charAt(0) }}
                    </div>
                    <div class="min-w-0">
                      <p :class="['font-semibold text-xs sm:text-sm truncate', darkMode ? 'text-white' : 'text-gray-900']">
                        {{ product.name }}
                      </p>
                      <p :class="['text-xs truncate hidden sm:block', darkMode ? 'text-gray-500' : 'text-gray-400']">
                        {{ product.description }}
                      </p>
                    </div>
                  </div>
                </td>
                <td :class="['hidden sm:table-cell py-4 px-4 font-semibold', darkMode ? 'text-white' : 'text-gray-900']">
                  ${{ product.price }}
                </td>
                <td :class="['py-3 sm:py-4 px-4 text-xs sm:text-base', darkMode ? 'text-gray-300' : 'text-gray-700']">
                  {{ product.sales }}
                </td>
                <td :class="['py-3 sm:py-4 px-4 font-bold text-xs sm:text-base', darkMode ? 'text-white' : 'text-gray-900']">
                  ${{ product.revenue.toLocaleString() }}
                </td>
                <td class="hidden md:table-cell py-4 px-4">
                  <span 
                    class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  >
                    {{ product.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '../stores/app'
import ChartCard from '../components/ChartCard.vue'
import {
  Activity as ActivityIcon,
  Users as UsersIcon,
  ShoppingCart as ShoppingCartIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Target as TargetIcon,
  Zap as ZapIcon,
  Award as AwardIcon
} from 'lucide-vue-next'

const store = useAppStore()
const darkMode = computed(() => store.darkMode)
const revenueData = computed(() => store.revenueData)
const products = computed(() => store.products)

const isMobile = ref(window.innerWidth < 768)

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const quickMetrics = [
  {
    label: 'Avg. Session Duration',
    value: '4m 32s',
    change: '+12%',
    changeColor: 'text-green-500',
    icon: ActivityIcon,
    bg: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    label: 'Bounce Rate',
    value: '32.5%',
    change: '-5%',
    changeColor: 'text-green-500',
    icon: TargetIcon,
    bg: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    label: 'Page Views',
    value: '45.2K',
    change: '+18%',
    changeColor: 'text-green-500',
    icon: ZapIcon,
    bg: 'bg-gradient-to-br from-pink-500 to-pink-600'
  },
  {
    label: 'Conversion Goal',
    value: '89%',
    change: '+7%',
    changeColor: 'text-green-500',
    icon: AwardIcon,
    bg: 'bg-gradient-to-br from-green-500 to-green-600'
  }
]

const performanceMetrics = [
  {
    title: 'User Engagement',
    value: '87',
    unit: 'score',
    change: '+5.2%',
    trend: 'up',
    icon: UsersIcon,
    iconColor: 'text-blue-500',
    breakdown: [
      { label: 'Active Users', value: 85, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
      { label: 'Returning Users', value: 72, color: 'bg-gradient-to-r from-blue-400 to-blue-500' },
      { label: 'New Users', value: 45, color: 'bg-gradient-to-r from-blue-300 to-blue-400' }
    ]
  },
  {
    title: 'Sales Performance',
    value: '92',
    unit: 'score',
    change: '+8.4%',
    trend: 'up',
    icon: ShoppingCartIcon,
    iconColor: 'text-purple-500',
    breakdown: [
      { label: 'Order Rate', value: 78, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
      { label: 'Cart Value', value: 85, color: 'bg-gradient-to-r from-purple-400 to-purple-500' },
      { label: 'Checkout Rate', value: 68, color: 'bg-gradient-to-r from-purple-300 to-purple-400' }
    ]
  },
  {
    title: 'Customer Satisfaction',
    value: '4.8',
    unit: '/ 5.0',
    change: '+2.1%',
    trend: 'up',
    icon: AwardIcon,
    iconColor: 'text-green-500',
    breakdown: [
      { label: 'Product Quality', value: 95, color: 'bg-gradient-to-r from-green-500 to-green-600' },
      { label: 'Support', value: 88, color: 'bg-gradient-to-r from-green-400 to-green-500' },
      { label: 'Delivery', value: 82, color: 'bg-gradient-to-r from-green-300 to-green-400' }
    ]
  }
]

const profitChartPoints = computed(() => {
  return revenueData.value.map((item, idx) => ({
    x: 50 + idx * 85,
    y: 280 - (item.profit / 50)
  }))
})

const profitAreaPoints = computed(() => {
  const points = profitChartPoints.value.map(p => `${p.x},${p.y}`).join(' ')
  const lastX = profitChartPoints.value[profitChartPoints.value.length - 1].x
  return `${points} ${lastX},280 50,280`
})
</script>
