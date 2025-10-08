<template>
  <div 
    :class="[
      'rounded-xl p-6 border shadow-sm hover:shadow-lg transition-all duration-300 card-hover',
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    ]"
  >
    <div class="flex items-center justify-between mb-4">
      <div 
        :class="[
          'w-12 h-12 rounded-xl flex items-center justify-center shadow-lg',
          iconBg
        ]"
      >
        <component :is="icon" class="w-6 h-6 text-white" />
      </div>
      <div 
        :class="[
          'flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg',
          change >= 0 
            ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' 
            : 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
        ]"
      >
        <component :is="change >= 0 ? ArrowUpIcon : ArrowDownIcon" class="w-4 h-4" />
        <span>{{ Math.abs(change) }}%</span>
      </div>
    </div>

    <h3 
      :class="[
        'text-sm font-medium mb-2',
        darkMode ? 'text-gray-400' : 'text-gray-600'
      ]"
    >
      {{ title }}
    </h3>

    <div class="flex items-end justify-between">
      <p 
        :class="[
          'text-3xl font-bold',
          darkMode ? 'text-white' : 'text-gray-900'
        ]"
      >
        {{ formattedValue }}
      </p>
      <p 
        :class="[
          'text-xs',
          darkMode ? 'text-gray-500' : 'text-gray-400'
        ]"
      >
        vs last month
      </p>
    </div>

    <div class="mt-4 pt-4 border-t" :class="darkMode ? 'border-gray-700' : 'border-gray-100'">
      <div class="flex items-center justify-between text-xs">
        <span :class="darkMode ? 'text-gray-500' : 'text-gray-400'">Progress</span>
        <span :class="darkMode ? 'text-gray-400' : 'text-gray-600'" class="font-medium">{{ progress }}%</span>
      </div>
      <div class="mt-2 w-full h-2 rounded-full overflow-hidden" :class="darkMode ? 'bg-gray-700' : 'bg-gray-100'">
        <div 
          class="h-full rounded-full transition-all duration-500"
          :class="progressColor"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app'
import { ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  value: [String, Number],
  change: Number,
  icon: Object,
  iconBg: {
    type: String,
    default: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  progress: {
    type: Number,
    default: 75
  }
})

const store = useAppStore()
const darkMode = computed(() => store.darkMode)

const formattedValue = computed(() => {
  let val = props.value
  if (typeof val === 'number') {
    if (props.prefix === '$') {
      val = val.toLocaleString('en-US')
    }
  }
  return `${props.prefix}${val}${props.suffix}`
})

const progressColor = computed(() => {
  if (props.progress >= 75) return 'bg-gradient-to-r from-green-500 to-emerald-600'
  if (props.progress >= 50) return 'bg-gradient-to-r from-blue-500 to-blue-600'
  if (props.progress >= 25) return 'bg-gradient-to-r from-yellow-500 to-orange-600'
  return 'bg-gradient-to-r from-red-500 to-red-600'
})
</script>
