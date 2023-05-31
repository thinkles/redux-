import React, { useState } from "react";
import { Layout, Menu, Input, Avatar, Dropdown, MenuProps, Switch } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {Link, Route, RouteProps} from "react-router-dom";
import HeaderGroup from "../../Layout/header";
import "./style.css";



const { Header, Footer, Sider, Content } = Layout;

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

const menuItem = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link to="/redux">Axios</Link>,
  },
];

interface RouteType extends Omit<RouteProps,"children">{
    children:React.ReactNode;
}

const Home = (props:RouteType) => {
    const {children} =props;

    console.log("🐺 ~ file: index.tsx:37 ~ Home ~ props:", props)

  return (
    <Layout className="layout">
      <Sider collapsible>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          items={menuItem}
        />
      </Sider>
      <Layout className="layout">
        <Header className="header">
          <HeaderGroup />
        </Header>
        <Content>{children}</Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
