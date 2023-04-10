import {AxiosRequestConfig, AxiosRequestHeaders} from "axios";


declare global {
    interface CustomAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
     showLoading?:boolean
    }

  }

  
  declare module 'axios' {
    export interface InternalAxiosRequestConfig<D = any> extends CustomAxiosRequestConfig<D> {
      headers: AxiosRequestHeaders;
    }
  }
