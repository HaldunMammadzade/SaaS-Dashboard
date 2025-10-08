<template>
  <div 
    :class="[
      'rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300',
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    ]"
  >
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 
          :class="[
            'text-lg font-bold mb-1',
            darkMode ? 'text-white' : 'text-gray-900'
          ]"
        >
          {{ title }}
        </h3>
        <p 
          :class="[
            'text-sm',
            darkMode ? 'text-gray-400' : 'text-gray-500'
          ]"
        >
          {{ subtitle }}
        </p>
      </div>

      <div class="flex items-center gap-2">
        <select 
          v-model="selectedPeriod"
          :class="[
            'px-3 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors',
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
          ]"
        >
          <option value="7days">7 Days</option>
          <option value="30days">30 Days</option>
          <option value="90days">90 Days</option>
          <option value="1year">1 Year</option>
        </select>

        <button 
          :class="[
            'p-2 rounded-lg transition-colors',
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
          ]"
          @click="$emit('download')"
        >
          <component :is="DownloadIcon" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <div class="chart-container" :style="{ height: height }">
      <slot></slot>
    </div>

    <div 
      v-if="showLegend"
      class="flex items-center justify-center gap-6 mt-6 pt-6 border-t"
      :class="darkMode ? 'border-gray-700' : 'border-gray-100'"
    >
      <div 
        v-for="item in legendItems" 
        :key="item.label"
        class="flex items-center gap-2"
      >
        <div 
          class="w-3 h-3 rounded-full"
          :style="{ backgroundColor: item.color }"
        ></div>
        <span 
          :class="[
            'text-sm font-medium',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          ]"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../stores/app'
import { Download as DownloadIcon } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  subtitle: String,
  height: {
    type: String,
    default: '300px'
  },
  showLegend: {
    type: Boolean,
    default: false
  },
  legendItems: {
    type: Array,
    default: () => []
  }
})

defineEmits(['download'])

const store = useAppStore()
const darkMode = computed(() => store.darkMode)
const selectedPeriod = ref('30days')
</script>

<style scoped>
.chart-container {
  width: 100%;
  position: relative;
}
</style>
