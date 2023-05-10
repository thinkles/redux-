import {AxiosRequestConfig, AxiosRequestHeaders} from "axios";

/**
 * 声明一个全局的接口，不引入可以直接使用
 */

declare global {
  interface CustomAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
    showLoading?: boolean
  }

}

/**
 * 通过指定 module 声明一个模块
 */

declare module 'axios' {
  export interface InternalAxiosRequestConfig<D = any> extends CustomAxiosRequestConfig<D> {
    headers: AxiosRequestHeaders;
  }
}
