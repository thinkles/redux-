import { Button, List } from "antd";
import { getDelayList, getList } from "../../utils/api";

const AxiosTest = () => {
  console.log("AxiosTest")
  const handle1 = () => {
    /**
     * * 这里的错误处理结果， 和响应拦截器重叠了，可以作为响应拦截器的补充
     */
    getList()
      .then((res) => {
        console.log("响应成功", res);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("响应错误");
          // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
          console.log("catch", error.response.data);
          console.log("catch", error.response.status);
          console.log("catch", error.response.headers);
        } else if (error.request) {
          // 请求已经成功发起，但没有收到响应
          // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
          // 而在node.js中是 http.ClientRequest 的实例
          console.log("catch", error.request);
        } else {
          // 发送请求时出了点问题
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const handle2 = () => {
    getDelayList()
      .then((res) => {
        console.log("res", res);
      })
      .catch((error) => {
        console.log("error.response", error.response);
      });
  };
  const data = [
    <>
      <p>
        封装Axios,<b>基本接口测试,有完整的错误处理机制</b>
      </p>
      <Button onClick={handle1}>发送请求</Button>
    </>,
    <>
      <p>
        <b>重复请求</b>,axios取消请求操作
      </p>
      <Button onClick={handle2}>发送请求</Button>
    </>,
  ];
  return (
    <div>
      <List
        size="large"
        header={<div>Axios多种场景</div>}
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

export default AxiosTest;
