import request from "../utils/http";

export const getList = () => request.get("/123/123/");

/**
 * * 完整的错误处理， 响应拦截器只是处理了第一个if的情况
 */
getList().catch(function (error) {
  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
    // 而在node.js中是 http.ClientRequest 的实例
    console.log(error.request);
  } else {
    // 发送请求时出了点问题
    console.log("Error", error.message);
  }
  console.log(error.config);
});
