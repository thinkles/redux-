import React from "react";
import { Button, Layout, Menu, Result } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { RouteComponentProps, RouteProps } from "react-router-dom";
import HeaderGroup from "../../Layout/header";
import { menuItem } from "../../constans";

const { Header, Footer, Sider, Content } = Layout;
import "./style.css";

interface RouteType<T> extends Omit<RouteComponentProps<any,any,T>, "children"> {
  children: React.ReactNode;
}
 

const Home = (props: RouteType<{is404?:boolean}>) => {
  const { children ,history, location} = props;

  const is404 = location.state?.is404;

  console.log("🐺 ~ file: index.tsx:25 ~ Home ~ location:", location)

 if(is404){
  return <Result
  status="404"
  title="404"
  subTitle="Sorry, the page you visited does not exist."
  extra={
    <Button onClick={() => history.goBack()} type="primary">
      Back Home
    </Button>
  }
/>
 }
  return (
       <Layout style={{ minHeight: "100vh" }} hasSider>
        <Sider collapsible>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            items={menuItem}
            style={{ minHeight: "100vh" }}
          />
        </Sider>
        <Layout >
          <Header style={{ padding: 0,background:"#fff" ,display:"flex"}}>
            <HeaderGroup />
           </Header>
          <Content>{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
   );
};

export default Home;
