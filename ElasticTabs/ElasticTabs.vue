<template>
  <div class="nav-container">
    <div class="indicator" :style="indicatorStyle"></div>
    <div class="nav">
      <div 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="nav-item"
        :class="{ active: activeTab === index }"
        @click="changeTab(index)"
      >
        <i :class="tab.icon"></i>
        <span>{{ tab.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'ElasticTabs',
  props: {
    tabs: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(item => 
          item.hasOwnProperty('icon') && 
          item.hasOwnProperty('label')
        )
      }
    },
    initialTab: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const activeTab = ref(props.initialTab)
    
    const indicatorStyle = computed(() => ({
      left: `${activeTab.value * (100 / props.tabs.length)}%`,
      width: `${100 / props.tabs.length}%`
    }))
    
    const changeTab = (index) => {
      activeTab.value = index
      emit('tab-change', index)
    }
    
    return {
      activeTab,
      indicatorStyle,
      changeTab
    }
  }
}
</script>

<style scoped>
.nav-container {
  position: relative;
  width: 100%;
  height: 70px;
  background: #fff;
  border-radius: 35px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  overflow: hidden;
}

.nav {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #555;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 2;
}

.nav-item i {
  font-size: 22px;
  margin-bottom: 5px;
  transition: all 0.3s ease;
}

.nav-item.active {
  color: #fff;
}

.nav-item.active i {
  transform: translateY(-5px);
}

.indicator {
  position: absolute;
  top: 0;
  height: 100%;
  background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 35px;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 0;
}

@media (max-width: 600px) {
  .nav-item {
    font-size: 12px;
  }
  
  .nav-item i {
    font-size: 18px;
  }
}
</style>
