import React, { useState } from "react";
import { Layout, Menu, Input, Avatar, Dropdown, MenuProps } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";

import "./style.css";

import TodoList from "../../components/redux/todoList";
import Display from "../../components/display/index";
import HeaderGroup from "./components/header";

const { Header, Footer, Sider, Content } = Layout;

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea"
};

const menuItem = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "nav 1"
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "nav 2"
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "nav 3"
  }
];

const BasicLayout: React.FC = () => {
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
        <Content className="content">
          <h1 className="title"># Redux</h1>
          <div className="container">
            <Display describe="redux 最基本使用" demoTitle="123123123123">
              <TodoList />
            </Display>
            <Display describe="redux 最基本使用" demoTitle="123123123123">
              <TodoList />
            </Display>
          </div>
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
