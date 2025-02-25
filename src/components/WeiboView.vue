<template>
  <div class="container">
    <!-- 刷新按钮 -->
    <div class="header">
      <el-button type="primary" @click="fetchData" class="refresh-button">
        <el-icon>
          <refresh/>
        </el-icon>
        刷新
      </el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" class="custom-table" @row-click="toggleDetailDialog">
      <el-table-column prop="user_id" label="用户ID" width="120"></el-table-column>
      <el-table-column prop="screen_name" label="用户名" width="150"></el-table-column>
      <el-table-column prop="text" label="内容" width="300"></el-table-column>
      <el-table-column prop="topics" label="主题" width="300"></el-table-column>
      <el-table-column prop="attitudes_count" label="点赞数" width="100"></el-table-column>
      <el-table-column prop="reposts_count" label="转发数" width="100"></el-table-column>
      <el-table-column prop="comments_count" label="评论数" width="100"></el-table-column>
      <el-table-column prop="location" label="位置" width="100"></el-table-column>
      <el-table-column prop="source" label="来源"></el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
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

    <WeiboDetailView v-model:visible="dialogVisible" :weibo="currentRow" />
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import WeiboDetailView from "@/components/WeiboDetailView.vue";
import axios from 'axios';
import {Refresh} from '@element-plus/icons-vue'; // 引入刷新图标

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
    const response = await axios.get('http://localhost:9001/weibo/page', {params});
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

// 对话框是否可见
const dialogVisible = ref(false);
// 当前选中的行数据
const currentRow = ref({});

const toggleDetailDialog = (row) => {
  currentRow.value = row;
  dialogVisible.value = true;
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.refresh-button {
  display: flex;
  align-items: center;
}

.custom-table {
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
}

.el-table {
  background-color: #ffffff;
  border-radius: 8px;
}

.el-table::before {
  background-color: transparent;
}

.el-pagination {
  margin-top: 20px;
}
</style>