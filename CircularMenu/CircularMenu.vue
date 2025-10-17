<!-- CircularMenu.vue -->
<template>
  <div class="circular-menu-container">
    <div class="menu-toggle" :class="{ active: isOpen }" @click="toggleMenu">
      <div class="toggle-icon"></div>
    </div>
    
    <div class="menu-items">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        class="menu-item"
        :style="getItemStyle(index)"
        @click="handleItemClick(item)"
      >
        <i :class="item.icon"></i>
        <span class="tooltip">{{ item.tooltip }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { icon: 'fas fa-home', tooltip: '首页', action: 'home' },
      { icon: 'fas fa-search', tooltip: '搜索', action: 'search' },
      { icon: 'fas fa-cog', tooltip: '设置', action: 'settings' },
      { icon: 'fas fa-envelope', tooltip: '消息', action: 'messages' },
      { icon: 'fas fa-heart', tooltip: '收藏', action: 'favorites' },
      { icon: 'fas fa-user', tooltip: '个人资料', action: 'profile' }
    ]
  },
  radius: {
    type: Number,
    default: 120
  },
  itemSize: {
    type: Number,
    default: 60
  },
  theme: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'dark', 'light'].includes(value)
  }
})

// Emits
const emit = defineEmits(['item-click'])

// Reactive data
const isOpen = ref(false)

// Computed
const menuItems = computed(() => props.items)

// Methods
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const getItemStyle = (index) => {
  if (!isOpen.value) {
    return {
      transform: 'translate(0, 0)',
      opacity: '0'
    }
  }

  const angle = (index * 2 * Math.PI) / menuItems.value.length
  const x = Math.cos(angle) * props.radius
  const y = Math.sin(angle) * props.radius

  return {
    transform: `translate(${x}px, ${y}px)`,
    opacity: '1'
  }
}

const handleItemClick = (item) => {
  emit('item-click', item)
  
  // 添加点击动画效果
  const event = window.event
  if (event && event.target.closest('.menu-item')) {
    const menuItem = event.target.closest('.menu-item')
    const originalTransform = menuItem.style.transform
    menuItem.style.transform = originalTransform + ' scale(0.9)'
    setTimeout(() => {
      menuItem.style.transform = originalTransform
    }, 300)
  }
}
</script>

<style scoped>
.circular-menu-container {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
}

/* 菜单切换按钮 */
.menu-toggle {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.toggle-icon {
  position: relative;
  width: 30px;
  height: 30px;
  transition: all 0.3s ease;
}

.toggle-icon::before,
.toggle-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  transition: all 0.3s ease;
  top: 50%;
  left: 0;
}

.menu-toggle:not(.active) .toggle-icon::before {
  transform: translateY(-50%);
}

.menu-toggle:not(.active) .toggle-icon::after {
  transform: translateY(-50%) rotate(90deg);
}

.menu-toggle.active .toggle-icon::before {
  transform: translateY(-50%) rotate(45deg);
}

.menu-toggle.active .toggle-icon::after {
  transform: translateY(-50%) rotate(-45deg);
}

/* 菜单项 */
.menu-items {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-item {
  position: absolute;
  width: v-bind(itemSize + 'px');
  height: v-bind(itemSize + 'px');
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  opacity: 0;
  transform: translate(0, 0);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.menu-item:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
}

.tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  white-space: nowrap;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
}

.menu-item:hover .tooltip {
  opacity: 1;
}

/* 主题样式 */
.theme-default .menu-toggle {
  background: rgba(255, 255, 255, 0.2);
}

.theme-default .menu-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
}

.theme-default .toggle-icon::before,
.theme-default .toggle-icon::after {
  background: white;
}

.theme-default .menu-item {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.theme-default .menu-item:hover {
  background: rgba(255, 255, 255, 0.3);
}

.theme-dark .menu-toggle {
  background: rgba(0, 0, 0, 0.7);
}

.theme-dark .menu-toggle:hover {
  background: rgba(0, 0, 0, 0.8);
}

.theme-dark .toggle-icon::before,
.theme-dark .toggle-icon::after {
  background: white;
}

.theme-dark .menu-item {
  background: rgba(0, 0, 0, 0.7);
  color: white;
}

.theme-dark .menu-item:hover {
  background: rgba(0, 0, 0, 0.8);
}

.theme-light .menu-toggle {
  background: rgba(255, 255, 255, 0.9);
}

.theme-light .menu-toggle:hover {
  background: white;
}

.theme-light .toggle-icon::before,
.theme-light .toggle-icon::after {
  background: #333;
}

.theme-light .menu-item {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border: 2px solid rgba(0, 0, 0, 0.1);
}

.theme-light .menu-item:hover {
  background: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .circular-menu-container {
    height: 350px;
  }
  
  .menu-toggle {
    width: 60px;
    height: 60px;
  }
  
  .menu-item {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
}
</style>
