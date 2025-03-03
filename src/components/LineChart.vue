<template>
  <div>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import {ref, onMounted, watchEffect, onBeforeUnmount} from 'vue';
import {Chart, registerables} from 'chart.js';

// 注册 Chart.js 的所有组件
Chart.register(...registerables);

// 获取 canvas 的引用
const chartRef = ref(null);
const props = defineProps(["dayPriceData"]);

// 定义图表实例
let chartInstance = null;

// 提取 day 和 price 数据
const dayList = ref([]);
const price = ref([]);

// 刷新图表
const refresh = () => {
  // 确保 chartRef.value 存在
  if (!chartRef.value) {
    return;
  }

  const ctx = chartRef.value.getContext('2d');

  // 如果已经存在图表实例，先销毁
  if (chartInstance) {
    chartInstance.destroy();
  }

  // 创建新的图表实例
  chartInstance = new Chart(ctx, {
    type: 'line', // 图表类型为折线图
    data: {
      // X 轴标签
      labels: dayList.value,
      // 数据集
      datasets: [
        {
          label: 'price', // 数据集名称
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // 背景颜色
          borderColor: 'rgba(75, 192, 192, 1)', // 边框颜色
          borderWidth: 1, // 边框宽度
          data: price.value, // 数据点
        },
      ],
    },
    options: {
      responsive: true, // 图表是否响应式
      scales: {
        y: {
          beginAtZero: true, // Y 轴从 0 开始
        },
      },
    },
  });
};

// 监听 props.dayPriceData 的变化
watchEffect(() => {
  dayList.value = props.dayPriceData.map((item) => item.day);
  price.value = props.dayPriceData.map((item) => item.price);

  // 确保 chartRef.value 存在时再刷新图表
  if (chartRef.value) {
    refresh();
  }
});

// 在组件挂载后初始化图表
onMounted(() => {
  refresh();
});

// 在组件卸载前销毁图表实例
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
div {
  width: 80%;
  margin: 0 auto;
}
</style>
