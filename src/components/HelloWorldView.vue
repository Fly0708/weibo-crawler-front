<template>
  <div class="hello">
    <el-button type="primary" @click="handleClick">点击我</el-button>
    <el-alert v-if="showAlert" title="你好，Element Plus！" type="success" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HelloWorld',
  setup() {
    const showAlert = ref(false)

    const handleClick = () => {
      showAlert.value = true
    }

    return {
      showAlert,
      handleClick,
    }
  },
}
</script>

<style scoped>
.hello {
  padding: 20px;
}
</style>