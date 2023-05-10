import axios from "axios";
import { hideLoading, showLoading } from "./loading";
import { AxiosResponse } from "axios";
import { message } from "antd";

const apiUrl = process.env.REACT_APP_API_URL;

function jumpLogin() {
  throw new Error("Function not implemented.");
}

function downloadFile(
  response: AxiosResponse<any, any>
):
  | import("axios").AxiosResponse<any, any>
  | Promise<import("axios").AxiosResponse<any, any>> {
  throw new Error("Function not implemented.");
}

const controller = new AbortController();

/**
 * * 1. 封装了axios,提供一个全局loading控制（showLoading标识控制）
 * * 2. 通过 ts declare覆盖axios的类型声明
 */

export const httpInstance = (config?: CustomAxiosRequestConfig) => {
  const urlSet = new Set();
  const instance = axios.create({
    baseURL: apiUrl,
    timeout: 1000,
    withCredentials: true,
    showLoading: true,
    signal: controller.signal,
    ...config,
  });
  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      console.log("config:", config);
      const path = JSON.stringify(config.url + config.data + config.data);
      if (urlSet.has(path)) {
        controller.abort();
      } else {
        urlSet.add(path);
      }
      if (config.showLoading !== false) showLoading();
      return config;
    },
    function (error) {
      const { config } = error;
      const path = JSON.stringify(config.url + config.data + config.data);
      urlSet.delete(path);
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      console.log("response:", response);
      if (response.config.showLoading !== false) hideLoading();
      const { code, data, message } = response.data;
      // config设置responseType为blob 处理文件下载
      if (response.data instanceof Blob) {
        return downloadFile(response);
      } else {
        if (code === 200) return data;
        else if (code === 401) {
          jumpLogin();
        } else {
          message.error(message);
          return Promise.reject(response.data);
        }
      }
    },
    function (error) {
      // 对响应错误做点什么
      // axios 的 validateStatus 配置项可以决定那个状态码来触发这个函数， 默认大等于200 小于300
      console.log("error-response:", error.response);
      console.log("error-config:", error.config);
      console.log("error-request:", error.request);
      if (error.config.showLoading !== false) hideLoading();
      if (error.response) {
        if (error.response.status === 401) {
          jumpLogin();
        }
      }
      message.error(error?.response?.data?.message || "服务端异常");
      return Promise.reject(error);
    }
  );
  return instance;
};

export default httpInstance;
