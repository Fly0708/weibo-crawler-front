<template>
  <div class="container">
    <h2>Weibo List</h2>
    <el-input v-model="inputUserId"  @keyup.enter = "fetchData" placeholder="User id" style="width: 300px; margin-right: 10px;"></el-input>
    <el-input v-model="inputUserName" @keyup.enter = "fetchData" placeholder="User name" style="width: 300px; margin-right: 10px;"></el-input>
    <el-button type="primary" @click="fetchData">
      <el-icon>
        <refresh/>
      </el-icon>
      Refresh
    </el-button>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" class="custom-table" @row-click="toggleDetailDialog">
      <el-table-column prop="user_id" label="user_id" width="120"></el-table-column>
      <el-table-column prop="screen_name" label="user_name" width="150"></el-table-column>
      <el-table-column prop="text" label="content" width="600"></el-table-column>
      <el-table-column prop="topics" label="topics" width="300"></el-table-column>
      <el-table-column prop="attitudes_count" label="点赞数" width="100"></el-table-column>
      <el-table-column prop="reposts_count" label="转发数" width="100"></el-table-column>
      <el-table-column prop="comments_count" label="评论数" width="100"></el-table-column>
      <el-table-column prop="location" label="location" width="100"></el-table-column>
      <el-table-column prop="source" label="source"></el-table-column>
      <el-table-column prop="created_at" label="发布时间" width="180"></el-table-column>
      <el-table-column prop="create_time" label="爬取时间" width="180"></el-table-column>
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

    <WeiboDetailView v-model:visible="dialogVisible" :weibo="currentRow"/>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import WeiboDetailView from "@/components/WeiboDetailView.vue";
import {Refresh} from '@element-plus/icons-vue'; // 引入刷新图标
import request from "@/api/request";

// 定义响应式变量
const tableData = ref([]); // 表格数据
const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页显示条数
const total = ref(0); // 总条数

const inputUserId = ref("");
const inputUserName = ref("");
// 获取数据的方法
const fetchData = async () => {
  try {
    const params = {
      page_num: currentPage.value,
      page_size: pageSize.value,
      user_id: inputUserId.value,
      screen_name: inputUserName.value,
    };
    const response = await request.get('/weibo/page', {params});
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