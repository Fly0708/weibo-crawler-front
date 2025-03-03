<template>
  <div class="container">
    <h2>Ctrip</h2>
    <el-autocomplete
        v-model="fromCity"
        :fetch-suggestions="citySearch"
        clearable
        class="inline-input w-50"
        placeholder="From City"
        style="width: 240px"
    />

    <el-autocomplete
        v-model="toCity"
        :fetch-suggestions="citySearch"
        clearable
        class="inline-input w-50"
        placeholder="To City"
        style="width: 240px"
    />

    <el-button type="primary" @click="fetchDayPriceList" class="refresh-button">
      <el-icon>
        <refresh/>
      </el-icon>
      Search
    </el-button>
    <LineChart class="chart" :day-price-data="dayPriceList" v-if="dayPriceList.length > 0"/>
  </div>


</template>

<script setup>
import {onMounted, ref} from "vue";
// import LineChart from "@/components/LineChart.vue";
import {Refresh} from "@element-plus/icons-vue";
import request from "@/api/request";
import LineChart from "@/components/LineChart.vue";
import {ElMessage} from "element-plus";

const cityOptions = ref([])
const fromCity = ref('')
const toCity = ref('')
const dayPriceList = ref([])

const fetchCityOptions = async () => {
  const response = await request.get('/ctrip/city_options')
  cityOptions.value = response.data
  console.log(cityOptions.value)
}

const citySearch = (queryString, cb) => {
  cb(cityOptions.value
      .filter((item) => item.label.toLowerCase().includes(queryString.toLowerCase()))
      .map(it => {
    return  {
      value: it.label,
      label: it.value,
    }
  }))
}

const fetchDayPriceList = async () => {
  const fromCityFilted = cityOptions.value.filter(item => item.label.toLowerCase() === fromCity.value.toLowerCase());
  if (fromCityFilted.length !== 1) {
    ElMessage.error('from city无对应');
    return;
  }

  const toCityFilted = cityOptions.value.filter(item => item.label.toLowerCase() === toCity.value.toLowerCase())
  if (toCityFilted.length !== 1) {
    ElMessage.error('to city无对应');
    return;
  }

  const response = await request.get('/ctrip/get_lowest_price', {
    params: {
      'from_city': fromCityFilted[0].value,
      'to_city': toCityFilted[0].value,
    }
  })
  dayPriceList.value = response.data
}

onMounted(() => {
  fetchCityOptions()
})
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

.chart {
  padding-top: 10px;
}
</style>