<template>
  <el-container style="height: 100vh;">
    <!-- 左侧栏 -->
    <el-aside width="200px" style="background-color: #f7f7f7; padding: 20px;">
      <el-menu :default-active="activeTab" @select="handleMenuSelect">
        <el-menu-item index="task">
          <span>Task</span>
        </el-menu-item>
        <el-menu-item index="blogger">
          <span>Blogger</span>
        </el-menu-item>
        <el-menu-item index="weibo">
          <span>Weibo</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容 -->
    <el-main style="padding: 20px;">
      <component :is="activeTab" />
    </el-main>
  </el-container>
</template>

<script>
import { ref } from 'vue'
import Task from './components/TaskView.vue'
import Blogger from './components/BloggerView.vue'
import Weibo from './components/WeiboView.vue'

export default {
  name: 'App',
  components: {
    Task,
    Blogger,
    Weibo,
  },
  setup() {
    const activeTab = ref('task') // 默认选中的菜单项

    // 处理菜单选择
    const handleMenuSelect = (index) => {
      activeTab.value = index
    }

    return {
      activeTab,
      handleMenuSelect,
    }
  },
}
</script>

<style>
body {
  margin: 0;
}
</style>