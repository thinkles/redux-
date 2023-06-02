import React from "react";
import { Redirect, RouteComponentProps, RouteProps } from "react-router-dom";
import Home from "../pages/home";
import Redux from "../pages/redux";
import Practice from "../pages/practice";
import Doc from "../pages/doc";
import { Button, Result } from "antd";

export interface RouteConfig extends Omit<RouteProps, "component" | "routes"> {
  // 其它属性
  component?: React.ComponentType<any>;
  routes?: RouteConfig[];
  redirect?: string;
}

const NotFound = (props: RouteComponentProps) => {
  const { location } = props;

  console.log("🐺 ~ file: index.tsx:19 ~ NotFound ~ location:", location)

  return (
    <Redirect
      to={Object.assign(location, { state: { is404: true } })}
    ></Redirect>
  );
};

const routes: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    redirect: "/index",
  },
  {
    path: "/",
    component: Home,
    routes: [
      { path: "/index", component: Redux, exact: true },
      {
        path: "/test/index",
        component: Practice,
        exact: true,
      },
      {
        path: "/doc/index",
        component: Doc,
        exact: true,
      },
      {
        path: "*",
        component: NotFound,
      },
    ],
  },
];

export default routes;
