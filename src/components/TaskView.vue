<template>
  <div class="container">
    <h2>Task List</h2>
    <el-input v-model="inputUserId" placeholder="User id" style="width: 300px; margin-right: 10px;"></el-input>
    <el-date-picker v-model="inputStartDate" type="date" placeholder="Start Date" style="margin-right: 10px;"></el-date-picker>
    <el-button type="primary" @click="addTask">Add Task</el-button>
    <el-button type="primary" @click="fetchData" class="refresh-button">
      <el-icon>
        <refresh/>
      </el-icon>
       Refresh
    </el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" class="custom-table" @row-click="toggleDetailDialog">
      <el-table-column prop="user_id" label="user_id" width="120"></el-table-column>
      <el-table-column prop="screen_name" label="user_name" width="180"></el-table-column>
      <el-table-column prop="start_day" label="start_day" width="150"></el-table-column>
      <el-table-column prop="status" label="status" width="150"></el-table-column>
      <el-table-column prop="create_time" label="create_time" width="220"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {Refresh} from "@element-plus/icons-vue";
import axios from "axios";
import moment from "moment";

const inputUserId = ref("")
const inputStartDate = ref("")

const addTask = async () => {
  console.log(inputUserId.value);
  console.log(inputStartDate.value)
  await axios.get('http://localhost:8000/tasks/add', {
    params:{
      user_id:inputUserId.value,
      start_day:moment(inputStartDate.value).format('YYYY-MM-DD'),
    }
  })
}

// 定义响应式变量
const tableData = ref([]); // 表格数据
const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页显示条数
const total = ref(0); // 总条数

// 获取数据的方法
const fetchData = async () => {
  try {
    const params = {
      page_num: currentPage.value,
      page_size: pageSize.value
    };
    const response = await axios.get('http://localhost:8000/tasks/page', {params});
    tableData.value = response.data.data;
    total.value = response.data.total;
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

// 每页显示条数变化
const handleSizeChange = (size) => {
  pageSize.value = size;
  fetchData();
};

// 当前页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchData();
};

// 组件挂载时获取数据
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
h2 {
  margin-bottom: 20px;
}
</style>