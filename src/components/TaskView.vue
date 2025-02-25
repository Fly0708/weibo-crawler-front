<template>
  <div>
    <h2>Task List</h2>
    <el-input v-model="taskInput" placeholder="Enter a task" style="width: 300px; margin-right: 10px;"></el-input>
    <el-date-picker v-model="taskDate" type="date" placeholder="Select date" style="margin-right: 10px;"></el-date-picker>
    <el-button type="primary" @click="addTask">Add Task</el-button>
    <el-table :data="tasks" style="margin-top: 20px;">
      <el-table-column prop="task" label="Task"></el-table-column>
      <el-table-column prop="date" label="Date"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TaskView',
  setup() {
    const taskInput = ref('')
    const taskDate = ref('')
    const tasks = ref([])

    const addTask = () => {
      if (taskInput.value && taskDate.value) {
        tasks.value.push({
          task: taskInput.value,
          date: taskDate.value.toLocaleDateString(),
        })
        taskInput.value = ''
        taskDate.value = ''
      } else {
        alert('Please enter a task and select a date.')
      }
    }

    return {
      taskInput,
      taskDate,
      tasks,
      addTask,
    }
  },
}
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>