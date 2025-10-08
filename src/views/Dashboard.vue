<template>
  <div class="dashboard">
    <div class="mb-6 sm:mb-8">
      <h1 :class="['text-2xl sm:text-3xl font-bold mb-2', darkMode ? 'text-white' : 'text-gray-900']">
        Dashboard Overview
      </h1>
      <p :class="['text-xs sm:text-sm', darkMode ? 'text-gray-400' : 'text-gray-600']">
        Welcome back, {{ user.name }}! Here's what's happening with your business today.
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      <StatCard
        title="Total Revenue"
        :value="stats.totalRevenue"
        :change="stats.revenueChange"
        prefix="$"
        :icon="DollarSignIcon"
        iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
        :progress="85"
      />
      <StatCard
        title="Total Users"
        :value="stats.totalUsers.toLocaleString()"
        :change="stats.usersChange"
        :icon="UsersIcon"
        iconBg="bg-gradient-to-br from-purple-500 to-purple-600"
        :progress="72"
      />
      <StatCard
        title="Active Subscriptions"
        :value="stats.activeSubscriptions"
        :change="stats.subscriptionsChange"
        :icon="CreditCardIcon"
        iconBg="bg-gradient-to-br from-pink-500 to-pink-600"
        :progress="68"
      />
      <StatCard
        title="Conversion Rate"
        :value="stats.conversionRate"
        :change="stats.conversionChange"
        suffix="%"
        :icon="TrendingUpIcon"
        iconBg="bg-gradient-to-br from-green-500 to-green-600"
        :progress="45"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <!-- Revenue Chart -->
      <ChartCard
        title="Revenue Overview"
        subtitle="Monthly revenue, expenses and profit"
        :height="isMobile ? '250px' : '350px'"
        :show-legend="true"
        :legend-items="[
          { label: 'Revenue', color: '#3b82f6' },
          { label: 'Expenses', color: '#ef4444' },
          { label: 'Profit', color: '#10b981' }
        ]"
      >
        <div class="w-full h-full flex items-center justify-center p-2 sm:p-4">
          <svg class="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
                <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0" />
              </linearGradient>
            </defs>
            
            <g v-for="(point, idx) in revenueChartPoints" :key="idx">
              <line 
                v-if="idx < revenueChartPoints.length - 1"
                :x1="point.x" 
                :y1="point.y" 
                :x2="revenueChartPoints[idx + 1].x" 
                :y2="revenueChartPoints[idx + 1].y"
                stroke="#3b82f6"
                stroke-width="3"
                stroke-linecap="round"
              />
            </g>
            
            <polygon 
              :points="revenueAreaPoints"
              fill="url(#revenueGradient)"
            />
            
            <g v-for="(point, idx) in revenueChartPoints" :key="'dot-' + idx">
              <circle 
                :cx="point.x" 
                :cy="point.y" 
                r="5"
                fill="#3b82f6"
                class="cursor-pointer hover:r-7 transition-all"
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
                :x="50 + idx * 100" 
                y="290"
                :class="darkMode ? 'fill-gray-400' : 'fill-gray-600'"
                text-anchor="middle"
                font-size="12"
              >
                {{ month.month }}
              </text>
            </g>
          </svg>
        </div>
      </ChartCard>

      <!-- User Growth Chart -->
      <ChartCard
        title="User Growth"
        subtitle="New users over the last 6 weeks"
        :height="isMobile ? '250px' : '350px'"
      >
        <div class="w-full h-full flex items-center justify-end gap-1 sm:gap-2 px-2 sm:px-4">
          <div 
            v-for="(week, idx) in userGrowth" 
            :key="idx"
            class="flex flex-col items-center justify-end flex-1"
            :style="{ height: isMobile ? '200px' : '300px' }"
          >
            <div 
              class="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative group"
              :style="{
                height: `${(week.users / 5500) * 100}%`,
                background: `linear-gradient(to top, #8b5cf6, #a78bfa)`
              }"
            >
              <div 
                class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                {{ week.users.toLocaleString() }}
              </div>
            </div>
            <span :class="['text-xs mt-2 font-medium', darkMode ? 'text-gray-400' : 'text-gray-600']">
              {{ week.date.replace('Week ', 'W') }}
            </span>
          </div>
        </div>
      </ChartCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <!-- Subscription Distribution -->
      <div 
        :class="[
          'rounded-xl p-4 sm:p-6 border shadow-sm',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
      >
        <h3 :class="['text-base sm:text-lg font-bold mb-4 sm:mb-6', darkMode ? 'text-white' : 'text-gray-900']">
          Subscription Plans
        </h3>
        
        <div class="flex items-center justify-center mb-4 sm:mb-6">
          <svg :width="isMobile ? '150' : '200'" :height="isMobile ? '150' : '200'" viewBox="0 0 200 200">
            <circle 
              v-for="(plan, idx) in subscriptions" 
              :key="idx"
              cx="100" 
              cy="100" 
              :r="70"
              fill="none"
              :stroke="plan.color"
              stroke-width="25"
              :stroke-dasharray="`${plan.percentage * 4.4} 440`"
              :stroke-dashoffset="calculateOffset(idx)"
              transform="rotate(-90 100 100)"
              class="transition-all duration-500"
            />
            <text 
              x="100" 
              y="100" 
              text-anchor="middle" 
              dy=".3em"
              :class="['text-xl sm:text-2xl font-bold', darkMode ? 'fill-white' : 'fill-gray-900']"
            >
              {{ subscriptions.reduce((sum, s) => sum + s.value, 0) }}
            </text>
            <text 
              x="100" 
              y="120" 
              text-anchor="middle"
              :class="['text-xs', darkMode ? 'fill-gray-400' : 'fill-gray-600']"
            >
              Total Plans
            </text>
          </svg>
        </div>

        <div class="space-y-3">
          <div 
            v-for="plan in subscriptions" 
            :key="plan.name"
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <div 
                class="w-3 h-3 rounded-full flex-shrink-0"
                :style="{ backgroundColor: plan.color }"
              ></div>
              <span :class="['text-xs sm:text-sm font-medium', darkMode ? 'text-gray-300' : 'text-gray-700']">
                {{ plan.name }}
              </span>
            </div>
            <div class="text-right">
              <span :class="['text-xs sm:text-sm font-bold', darkMode ? 'text-white' : 'text-gray-900']">
                {{ plan.value }}
              </span>
              <span :class="['text-xs ml-2', darkMode ? 'text-gray-500' : 'text-gray-400']">
                ({{ plan.percentage }}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div 
        :class="[
          'lg:col-span-2 rounded-xl p-4 sm:p-6 border shadow-sm',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]"
      >
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <h3 :class="['text-base sm:text-lg font-bold', darkMode ? 'text-white' : 'text-gray-900']">
            Recent Transactions
          </h3>
          <button 
            :class="[
              'text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors',
              darkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-600 hover:bg-blue-50'
            ]"
          >
            View All
          </button>
        </div>

        <div class="space-y-3 sm:space-y-4">
          <div 
            v-for="transaction in transactions.slice(0, 5)" 
            :key="transaction.id"
            :class="[
              'flex items-center justify-between p-3 sm:p-4 rounded-lg transition-colors',
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            ]"
          >
            <div class="flex items-center gap-3 sm:gap-4 min-w-0">
              <div 
                :class="[
                  'w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                  transaction.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' :
                  transaction.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                  'bg-red-100 dark:bg-red-900/30'
                ]"
              >
                <component 
                  :is="transaction.status === 'completed' ? CheckCircleIcon : 
                       transaction.status === 'pending' ? ClockIcon : XCircleIcon"
                  :class="[
                    'w-4 h-4 sm:w-5 sm:h-5',
                    transaction.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                    transaction.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  ]"
                />
              </div>
              <div class="min-w-0">
                <p :class="['font-semibold text-xs sm:text-sm truncate', darkMode ? 'text-white' : 'text-gray-900']">
                  {{ transaction.customer }}
                </p>
                <p :class="['text-xs', darkMode ? 'text-gray-500' : 'text-gray-400']">
                  {{ transaction.date }}
                </p>
              </div>
            </div>
            <div class="text-right ml-2 flex-shrink-0">
              <p :class="['font-bold text-xs sm:text-base', darkMode ? 'text-white' : 'text-gray-900']">
                ${{ transaction.amount.toLocaleString() }}
              </p>
              <span 
                :class="[
                  'text-xs px-2 py-0.5 rounded-full font-medium inline-block mt-1',
                  transaction.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                ]"
              >
                {{ transaction.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '../stores/app'
import StatCard from '../components/StatCard.vue'
import ChartCard from '../components/ChartCard.vue'
import {
  DollarSign as DollarSignIcon,
  Users as UsersIcon,
  CreditCard as CreditCardIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  XCircle as XCircleIcon
} from 'lucide-vue-next'

const store = useAppStore()
const darkMode = computed(() => store.darkMode)
const user = computed(() => store.user)
const stats = computed(() => store.stats)
const revenueData = computed(() => store.revenueData)
const userGrowth = computed(() => store.userGrowth)
const subscriptions = computed(() => store.subscriptions)
const transactions = computed(() => store.transactions)

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

const revenueChartPoints = computed(() => {
  return revenueData.value.map((item, idx) => ({
    x: 50 + idx * 100,
    y: 250 - (item.revenue / 100)
  }))
})

const revenueAreaPoints = computed(() => {
  const points = revenueChartPoints.value.map(p => `${p.x},${p.y}`).join(' ')
  const lastX = revenueChartPoints.value[revenueChartPoints.value.length - 1].x
  return `${points} ${lastX},250 50,250`
})

const calculateOffset = (index) => {
  let offset = 0
  for (let i = 0; i < index; i++) {
    offset += subscriptions.value[i].percentage * 4.4
  }
  return -offset
}
</script>
