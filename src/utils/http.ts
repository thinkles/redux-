import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
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

const CancelToken = axios.CancelToken;
const urlMap = new Map();

/**
 *
 * @param 请求config配置信息
 * @returns  生成一个key表示重复的请求
 */

const getRequestKey = (config: AxiosRequestConfig) => {
  if(config!==undefined){
    const { method, url, params, data } = config;
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join("&");
  }
  return ""
  
};

/**
 * * AbortController() 方法取消请求
 *
 */
const cancelRequest = (config: InternalAxiosRequestConfig) => {
  const requestKey = getRequestKey(config);
  if (urlMap.has(requestKey)) {
    const controller = urlMap.get(requestKey);
    controller.abort();
  } else {
    const controller = new AbortController();
    config.signal = controller.signal;
    urlMap.set(requestKey, controller);
  }

  return config;
};

/**
 * * 使用第二种方法实现取消重复请求
 */

const cancelRequestAnother = (config: InternalAxiosRequestConfig) => {
  const requestKey = getRequestKey(config);
  if (urlMap.has(requestKey)) {
    const source = urlMap.get(requestKey);
    source.cancel("取消请求。。");
  } else {
    const source = CancelToken.source();
    config.cancelToken = source.token;
    urlMap.set(requestKey, source);
  }
  return config;
};

/**
 * * 1. 封装了axios,提供一个全局loading控制（showLoading标识控制）
 * * 2. 通过 ts declare覆盖axios的类型声明
 */
export const httpInstance = (config?: CustomAxiosRequestConfig) => {
  const instance = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    withCredentials: true,
    showLoading: true,
    // cancelToken: source.token,
    ...config,
  });
  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      console.log("请求config:", config);
      // config = cancelRequest(config);
      config = cancelRequestAnother(config);

      if (config.showLoading !== false) showLoading();
      return config;
    },
    function (error) {
      const { config } = error;
      console.log("请求错误处理config", config);

      const requestKey = getRequestKey(config);
      urlMap.delete(requestKey);

      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      console.log("响应response:", response);
      if (response.config.showLoading !== false) hideLoading();
      const { data, status, config } = response;
      // config设置responseType为blob 处理文件下载
      console.log("响应config:", config);

      const requestKey = getRequestKey(config);
      urlMap.delete(requestKey);

      if (response.data instanceof Blob) {
        return downloadFile(response);
      } else {
        if (status === 200) {
          return data;
        } else if (status === 401) {
          jumpLogin();
        } else {
          message.error("请求失败");
          return Promise.reject(response.data);
        }
      }
    },
    function (error) {
      // 响应错误的情况都会走，响应拦截器，例如错误1，状态码大于200，错误2，没有返回响应结果
      console.log("error:", error);
      console.log("error-config:", error.config);
      console.log("error-request:", error.request);

      const requestKey = getRequestKey(error.config);
      urlMap.delete(requestKey);

      if (axios.isCancel(error)) {
        message.error("重复请求");
        return Promise.reject(error);
      }
    
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

export const request = httpInstance();
