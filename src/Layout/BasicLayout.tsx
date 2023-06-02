import React, { useState } from "react";
import { Layout, Menu, Input, Avatar, Dropdown, MenuProps } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import "./style.css";
import HeaderGroup from "./header";
import { Link, Route, Switch } from "react-router-dom";
import Container from "../components/Container";
import AxiosTest from "../components/Axios";
import ReduxTest from "../components/redux/todoList";

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
    label: <Link to="/test">Axios</Link>,
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: <Link to="/redux">Redux</Link>,
  },
 
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
          <Switch>
            <Route exact path="/test">
              <Container title="axios 测试">
                <AxiosTest />
              </Container>
            </Route>
            <Route path="/redux">
              <Container title="reactRedux、Redux使用">
                <ReduxTest />
              </Container>
            </Route>
            {/* <Route path="/saga">
              <Container title="axios 测试">
                <TodoList />
              </Container>
            </Route> */}
          </Switch>
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
