<template>
  <div class="container">
    <h1>弹性标签导航</h1>
    <p class="description">使用示例</p>
    
    <ElasticTabs 
      :tabs="tabs" 
      @tab-change="handleTabChange"
    />
    
    <div class="content">
      {{ currentContent }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ElasticTabs from './ElasticTabs.vue'

export default {
  components: {
    ElasticTabs
  },
  setup() {
    const tabs = ref([
      { icon: 'fas fa-home', label: '首页' },
      { icon: 'fas fa-compass', label: '探索' },
      { icon: 'fas fa-bell', label: '通知' },
      { icon: 'fas fa-bookmark', label: '收藏' },
      { icon: 'fas fa-user', label: '我的' },
    ])
    
    const contents = [
      '这是首页内容，展示主要信息',
      '探索新内容，发现更多精彩',
      '您有3条新通知',
      '查看您收藏的内容',
      '个人资料和设置'
    ]
    
    const currentContent = ref(contents[0])
    
    const handleTabChange = (index) => {
      currentContent.value = contents[index]
    }
    
    return {
      tabs,
      currentContent,
      handleTabChange
    }
  }
}
</script>

<style>
.container {
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

.description {
  color: #666;
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.6;
}

.content {
  margin-top: 30px;
  padding: 25px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-size: 18px;
  text-align: center;
}
</style>
