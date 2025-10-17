<template>
  <div :class="currentTheme">
    <div class="container">
      <h1>Vue3 旋转菜单</h1>
      
      <!-- 主题切换控件 -->
      <div class="controls">
        <button 
          v-for="theme in themes" 
          :key="theme"
          class="control-btn"
          :class="{ active: currentTheme === theme }"
          @click="currentTheme = theme"
        >
          {{ getThemeName(theme) }}
        </button>
      </div>
      
      <!-- 演示区域 -->
      <div class="demo">
        <!-- 演示1：默认配置 -->
        <div class="demo-section">
          <h2>默认配置</h2>
          <CircularMenu @item-click="handleMenuClick" />
        </div>

        <!-- 演示2：自定义菜单项 -->
        <div class="demo-section">
          <h2>自定义菜单项</h2>
          <CircularMenu 
            :items="customItems" 
            radius="150"
            item-size="70"
            :theme="currentTheme"
            @item-click="handleMenuClick"
          />
        </div>
        
        <!-- 演示3：4个菜单项 -->
        <div class="demo-section">
          <h2>4个菜单项</h2>
          <CircularMenu 
            :items="fourItems" 
            radius="100"
            :theme="currentTheme"
            @item-click="handleMenuClick"
          />
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CircularMenu from '@/components/CircularMenu.vue'

// 当前主题
const currentTheme = ref('theme-default')

// 可用主题列表
const themes = ['theme-default', 'theme-dark', 'theme-light']

// 获取主题显示名称
const getThemeName = (theme) => {
  const names = {
    'theme-default': '默认',
    'theme-dark': '暗黑',
    'theme-light': '明亮'
  }
  return names[theme] || theme
}

// 自定义菜单项配置（社交媒体图标）
const customItems = [
  { icon: 'fab fa-github', tooltip: 'GitHub', action: 'github' },
  { icon: 'fab fa-linkedin', tooltip: 'LinkedIn', action: 'linkedin' },
  { icon: 'fab fa-youtube', tooltip: 'YouTube', action: 'youtube' },
  { icon: 'fab fa-instagram', tooltip: 'Instagram', action: 'instagram' },
  { icon: 'fab fa-tiktok', tooltip: 'TikTok', action: 'tiktok' },
  { icon: 'fab fa-reddit', tooltip: 'Reddit', action: 'reddit' }
]

// 4个菜单项的配置
const fourItems = [
  { icon: 'fas fa-music', tooltip: '音乐', action: 'music' },
  { icon: 'fas fa-video', tooltip: '视频', action: 'video' },
  { icon: 'fas fa-gamepad', tooltip: '游戏', action: 'game' },
  { icon: 'fas fa-book', tooltip: '阅读', action: 'read' }
]

// 处理菜单项点击事件
const handleMenuClick = (item) => {
  lastClicked.value = `${item.tooltip} (${item.action})`
  console.log('菜单项被点击:', item)
  // 这里可以添加具体的业务逻辑
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  text-align: center;
  color: white;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* 控制按钮区域 */
.controls {
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);  /* 毛玻璃效果 */
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);  /* 悬停上浮效果 */
}

.control-btn.active {
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);  /* 激活状态发光 */
}

/* 演示区域布局 */
.demo {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.demo-section {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  backdrop-filter: blur(10px);
  width: 350px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.demo-section h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  height: 40px;
}

/* 状态显示面板 */
.status-panel {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  max-width: 600px;
  margin: 0 auto;
}

.status-panel h3 {
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.status-panel p {
  font-size: 1.1rem;
  color: #ffeaa7;  /* 强调色 */
}

/* ========== 页面主题样式 ========== */

.theme-default {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.theme-dark {
  background: linear-gradient(135deg, #2c3e50, #34495e);
}

.theme-light {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: #333;
}

.theme-light .control-btn {
  color: #333;
  background: rgba(255, 255, 255, 0.7);
}

.theme-light .control-btn:hover {
  background: rgba(255, 255, 255, 0.9);
}

.theme-light .demo-section,
.theme-light .status-panel {
  background: rgba(255, 255, 255, 0.2);
}
</style>