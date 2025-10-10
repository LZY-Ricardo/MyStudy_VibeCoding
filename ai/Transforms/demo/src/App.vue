<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <!-- 头部 -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          中文情感分析工具
        </h1>
        <button 
          @click="toggleTheme"
          class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <div v-if="isDark" class="i-lucide-sun w-5 h-5 text-yellow-500"></div>
          <div v-else class="i-lucide-moon w-5 h-5 text-gray-600"></div>
        </button>
      </div>
    </header>

    <!-- 主内容 -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- 介绍 -->
      <div class="text-center mb-8">
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-4">
          基于 Transformers API 的实时中文文本情感分析
        </p>
        <div class="flex justify-center gap-4 text-sm">
          <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
            ✨ 实时分析
          </span>
          <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
            🔒 隐私保护
          </span>
          <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
            🚀 服务端处理
          </span>
        </div>
      </div>

      <!-- 分析器 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <!-- 模型状态 -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            情感分析器
          </h2>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-2">
              <div 
                class="w-2 h-2 rounded-full"
                :class="{
                  'bg-green-500': modelStatus === 'ready',
                  'bg-yellow-500': modelStatus === 'loading',
                  'bg-red-500': modelStatus === 'error',
                  'bg-gray-400': modelStatus === 'idle'
                }"
              ></div>
              <span class="text-sm text-gray-600 dark:text-gray-300">
                {{ modelStatusText }}
              </span>
            </div>
          </div>
        </div>

        <!-- 文本输入 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            输入要分析的中文文本
          </label>
          <textarea
            v-model="inputText"
            placeholder="请输入中文文本进行情感分析..."
            class="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            @keydown.ctrl.enter="analyzeText"
          ></textarea>
          <div class="flex justify-between items-center mt-2">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ inputText.length }} 字符 | Ctrl+Enter 快速分析
            </span>
            <button
              v-if="inputText"
              @click="inputText = ''"
              class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              清空
            </button>
          </div>
        </div>

        <!-- 分析按钮 -->
        <div class="mb-6">
          <button
            @click="analyzeText"
            :disabled="!inputText.trim() || isAnalyzing"
            class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <div v-if="isAnalyzing" class="i-lucide-loader-2 w-4 h-4 animate-spin"></div>
            <div v-else class="i-lucide-brain w-4 h-4"></div>
            {{ isAnalyzing ? '分析中...' : '开始分析' }}
          </button>
        </div>

        <!-- 分析结果 -->
        <div v-if="result" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            分析结果
          </h3>
          
          <!-- 整体情感 -->
          <div class="p-4 rounded-lg border" :class="resultBorderClass">
            <div class="flex items-center gap-3 mb-2">
              <div class="text-2xl">
                {{ result.type === 'positive' ? '😊' : result.type === 'negative' ? '😔' : '😐' }}
              </div>
              <div>
                <div class="font-semibold" :class="resultTextClass">
                  {{ result.type === 'positive' ? '正面情感' : result.type === 'negative' ? '负面情感' : '中性情感' }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  置信度: {{ (result.confidence * 100).toFixed(1) }}%
                </div>
              </div>
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              原始标签: {{ result.label }}
            </div>
          </div>


        </div>

        <!-- 错误信息 -->
        <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div class="flex items-center gap-2 text-red-800 dark:text-red-200">
            <div class="i-lucide-alert-circle w-5 h-5"></div>
            <span class="font-medium">分析失败</span>
          </div>
          <p class="text-sm text-red-600 dark:text-red-300 mt-1">{{ error }}</p>
        </div>
      </div>

      <!-- 示例文本 -->
      <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          试试这些示例
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            v-for="example in examples"
            :key="example.text"
            @click="inputText = example.text"
            class="p-3 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div class="text-sm font-medium text-gray-900 dark:text-white mb-1">
              {{ example.label }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ example.text }}
            </div>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup >
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const isDark = ref(false)
const inputText = ref('')
const isAnalyzing = ref(false)
const result = ref(null)
const error = ref('')
const modelStatus = ref('ready')

// 示例文本
const examples = [
  { label: '正面示例', text: '今天天气真好，心情特别愉快！' },
  { label: '负面示例', text: '这个产品质量太差了，非常失望。' },
  { label: '中性示例', text: '今天是星期三，明天是星期四。' },
  { label: '复杂情感', text: '虽然价格有点贵，但是服务态度很好。' }
]

// 计算属性
const modelStatusText = computed(() => {
  switch (modelStatus.value) {
    case 'idle': return '未连接'
    case 'loading': return '连接中...'
    case 'ready': return '服务就绪'
    case 'error': return '连接失败'
    default: return '未知状态'
  }
})

const resultBorderClass = computed(() => {
  if (!result.value) return ''
  switch (result.value.type) {
    case 'positive': return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
    case 'negative': return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
    default: return 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
  }
})

const resultTextClass = computed(() => {
  if (!result.value) return ''
  switch (result.value.type) {
    case 'positive': return 'text-green-800 dark:text-green-200'
    case 'negative': return 'text-red-800 dark:text-red-200'
    default: return 'text-gray-800 dark:text-gray-200'
  }
})

// 主题切换
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// 初始化主题
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
  document.documentElement.classList.toggle('dark', isDark.value)
}

// 检查服务器状态
const checkServerStatus = async () => {
  try {
    modelStatus.value = 'loading'
    error.value = ''
    
    // 简单的健康检查，可以发送一个测试请求
    const response = await fetch('/api/sentiment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: '测试' })
    })
    
    if (response.ok) {
      modelStatus.value = 'ready'
    } else {
      throw new Error('服务器响应异常')
    }
  } catch (err) {
    console.error('服务器连接失败:', err)
    modelStatus.value = 'error'
    error.value = '无法连接到分析服务，请确保服务器正在运行'
  }
}

// 映射标签到情感类型
const mapLabelToSentiment = (label) => {
  const lowerLabel = label.toLowerCase()
  if (label === '正面' || lowerLabel.includes('positive') || lowerLabel.includes('pos') || lowerLabel === 'label_1') {
    return 'positive'
  } else if (label === '负面' || lowerLabel.includes('negative') || lowerLabel.includes('neg') || lowerLabel === 'label_0') {
    return 'negative'
  }
  return 'neutral'
}

// 分析文本
const analyzeText = async () => {
  if (!inputText.value.trim()) return
  
  try {
    isAnalyzing.value = true
    error.value = ''
    result.value = null
    
    // 调用后端 API
    const response = await fetch('/api/sentiment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: inputText.value.trim() })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const results = await response.json()
    const topResult = Array.isArray(results) ? results[0] : results

    console.log('API 响应:', results)
    
    // API 响应数据结构适配
    const label = topResult.label || 'unknown'
    const score = topResult.score || 0
    
    result.value = {
      type: mapLabelToSentiment(label),
      label: label,
      confidence: score
    }
  } catch (err) {
    console.error('分析失败:', err)
    error.value = `分析失败: ${err instanceof Error ? err.message : '未知错误'}`
  } finally {
    isAnalyzing.value = false
  }
}

// 生命周期
onMounted(() => {
  initTheme()
  checkServerStatus()
})
</script>

<style>
/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

/* 动画 */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 过渡效果 */
.transition-colors {
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}
</style>
