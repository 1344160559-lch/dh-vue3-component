<!-- @/components/GlobalLoading/GlobalLoading.vue -->
<script setup>
import { ref, watch, defineProps, defineExpose, computed } from 'vue'

const props = defineProps({
  visible: { // 是否显示
    type: Boolean,
    default: false
  },
  text: { // 显示文字
    type: String,
    default: ''
  },
  background: { // 遮罩层颜色
    type: String,
    default: ''
  },
  spinnerType: { // 动画类型（circle/dots/default）
    type: String,
    default: 'circle',
    validator: (value) => ['circle', 'dots', 'default'].includes(value)
  },
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark', 'glass'].includes(value)
  },
  fullscreen: { // 是否全屏
    type: Boolean,
    default: true
  },
  lock: { // 是否锁定页面滚动
    type: Boolean,
    default: true
  },
  customClass: { // 自定义类名
    type: String,
    default: ''
  }
})

// 使用内部响应式变量来管理文本
const internalText = ref(props.text)

// 监听 props.text 的变化
watch(() => props.text, (newText) => {
  internalText.value = newText
})

// 计算 mask 样式
const maskStyle = computed(() => {
  return props.background ? { background: props.background } : {}
})

// 暴露方法给父组件
defineExpose({
  setText: (text) => {
    internalText.value = text
  }
})
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="visible" 
      class="global-loading"
      :class="[{ 
        'global-loading--fullscreen': fullscreen
       }, customClass]"
    >
      <div v-if="fullscreen" class="loading-mask" :style="maskStyle"></div>
      
      <div class="loading-content" :data-theme="theme">
        <div class="loading-spinner">
          <!-- 圆形 spinner -->
          <div v-if="spinnerType === 'circle'" class="spinner-circle"></div>
          <!-- 点状 spinner -->
          <div v-else-if="spinnerType === 'dots'" class="spinner-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
          <!-- 默认 spinner -->
          <div v-else class="spinner-default">
            <div class="spinner"></div>
          </div>
        </div>
        <div v-if="internalText" class="loading-text">
          {{ internalText }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* 全局 loading 容器 */
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 允许点击穿透 */
  z-index: 9999;
}

/* 全屏模式 */
.global-loading--fullscreen {
  pointer-events: auto;
}

/* 非全屏模式：解决“飞到左上角”问题 */
.global-loading:not(.global-loading--fullscreen) .loading-content {
  position: fixed !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: auto;
}

.loading-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.loading-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  min-width: 120px;
  color: #606266;
}

/* 深色主题 */
.loading-content[data-theme='dark'] {
  background: rgba(30, 30, 30, 0.9);
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* 玻璃质感 */
.loading-content[data-theme='glass'] {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 圆形 spinner */
.spinner-circle {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 12px;
}

/* 点状 spinner */
.spinner-dots {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 12px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3498db;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

/* 默认 spinner */
.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 12px;
  border: 3px solid transparent;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  /* color: #606266; */
  font-size: 14px;
  line-height: 1.5;
}

/* 锁定页面滚动 */
.loading-lock {
  overflow: hidden !important;
}

/* 动画定义 */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
