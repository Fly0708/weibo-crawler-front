<template>
  <div class="container">
    <h2>Blogger List</h2>

    <div class="header">
      <el-button type="primary" @click="fetchData" class="refresh-button">
        <el-icon>
          <refresh/>
        </el-icon>
        Refresh
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" class="custom-table">
      <el-table-column prop="id" label="user_id" width="120"></el-table-column>
      <el-table-column prop="screen_name" label="user_name" width="180"></el-table-column>
      <el-table-column prop="gender" label="gender" width="100"></el-table-column>
      <el-table-column prop="statuses_count" label="statuses_count" width="100"></el-table-column>
      <el-table-column prop="followers_count" label="followers_count" width="100"></el-table-column>
      <el-table-column prop="follow_count" label="follow_count" width="100"></el-table-column>
      <el-table-column prop="registration_time" label="registration_time" width="120"></el-table-column>
      <el-table-column prop="sunshine" label="sunshine" width="100"></el-table-column>
      <el-table-column prop="birthday" label="birthday" width="100"></el-table-column>
      <el-table-column prop="location" label="location" width="100"></el-table-column>
      <el-table-column prop="education" label="education" width="100"></el-table-column>
      <el-table-column prop="company" label="company" width="100"></el-table-column>
      <el-table-column prop="description" label="description" width="100"></el-table-column>
      <el-table-column prop="profile_url" label="profile_url" width="100"></el-table-column>
      <el-table-column prop="profile_image_url" label="profile_image_url" width="400"></el-table-column>
      <el-table-column prop="avatar_hd" label="avatar_hd" width="200"></el-table-column>
      <el-table-column prop="urank" label="urank" width="100"></el-table-column>
      <el-table-column prop="mbrank" label="mbrank" width="100"></el-table-column>
      <el-table-column prop="verified" label="verified" width="100"></el-table-column>
      <el-table-column prop="verified_type" label="verified_type" width="100"></el-table-column>
      <el-table-column prop="verified_reason" label="verified_reason" width="300"></el-table-column>
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
import request from "@/api/request";
import {Refresh} from "@element-plus/icons-vue";

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
    const response = await request.get('/bloggers/page', {params});
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