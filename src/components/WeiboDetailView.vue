<template>
  <el-dialog v-model="dialogVisible" title="" @close="handleClose">
    <div class="post-header">
      <span class="screen-name">{{ weibo.screen_name }}</span>
      <span class="created-at">{{weibo.created_at }}</span>
    </div>
    <div class="post-text">{{ weibo.text }}</div>
    <div class="post-media">
      <template v-if="weibo.video_url">
        <video controls :src="weibo.video_url" class="media-item"></video>
      </template>
      <!-- 图片 -->
      <template v-else-if="weibo.pics">
        <el-image
            v-for="(pic, index) in weibo.pics.split(',')"
            :key="index"
            :src="pic"
            class="media-item"
            :preview-src-list="weibo.pics.split(',')"
            :initial-index="index"
            fit="cover"
        ></el-image>
      </template>
    </div>
    <div class="post-footer">
      <el-button type="text" icon="el-icon-thumb">点赞数: {{ weibo.attitudes_count }}</el-button>
      <el-button type="text" icon="el-icon-share">转发数: {{ weibo.reposts_count }}</el-button>
      <el-button type="text" icon="el-icon-chat-dot-round">评论数: {{ weibo.comments_count }}</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import {ref, watch} from 'vue';

// 定义 props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  weibo: {
    type: Object,
    default: () => ({}), // 默认值为空对象
  }
});

// 定义内部状态
const dialogVisible = ref(props.visible);

// 定义 emit
const emit = defineEmits(['update:visible']);

// 监听 props.visible 的变化，同步到 dialogVisible
watch(
    () => props.visible,
    (newVal) => {
      dialogVisible.value = newVal;
    }
);

// 处理对话框关闭事件
const handleClose = () => {
  dialogVisible.value = false;
  emit('update:visible', false);
};
</script>

<style scoped>
.weibo-post {
  margin-bottom: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.screen-name {
  font-weight: bold;
}

.created-at {
  color: #999;
}

.post-text {
  margin-bottom: 10px;
}

.post-media {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}

.media-item {
  width: calc(33.33% - 10px); /* 每行显示3个，减去间隙 */
  height: auto;
  border-radius: 4px;
  object-fit: cover; /* 保持图片比例 */
}

.post-footer {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.dialog-content {
  max-height: 80vh; /* 限制对话框内容的最大高度 */
  overflow-y: auto; /* 允许垂直滚动 */
}

.preview-image {
  width: 100%; /* 图片宽度适应对话框 */
  height: auto; /* 高度自动缩放 */
  display: block; /* 避免图片下方有空白 */
  object-fit: cover;
}
</style>