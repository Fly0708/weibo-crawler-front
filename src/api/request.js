// src/api/request.js
import axios from 'axios';

// 创建一个 axios 实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL, // 从环境变量中获取 baseURL，如果未设置则使用默认值
    timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
        // 可以在这里添加其他默认的请求头
    },
});

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 对响应数据做些什么
        return response.data;
    },
    (error) => {
        // 对响应错误做些什么
        return Promise.reject(error);
    }
);

export default instance;