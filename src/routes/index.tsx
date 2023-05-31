import React from "react";
import { RouteComponentProps, RouteProps } from "react-router-dom";
import Home from "../pages/home";

export interface RouteConfig extends Omit<RouteProps, "path"|"component"> {
  path: string;
  routes?: RouteConfig[];
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> ;

}

const routes: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    component: React.lazy(() => import("../pages/home")),
    routes: [
      { path: "/redux", component: React.lazy(() => import("../pages/redux")) },
      {
        path: "/practice",
        component: React.lazy(() => import("../pages/practice")),
        routes: [
          {
            path: "/practice/:id",
            component: React.lazy(
              () => import("../pages/practice/practiceDetail")
            ),
          },
          {
            path: "/products/new",
            component: React.lazy(
              () => import("../pages/practice/practiceNew")
            ),
          },
        ],
      },
    ],
  },
  { 
    path: "/test",
    // exact: true,
    component: React.lazy(() => import("../pages/home")),
    routes: [ {path: "/test/redux", component: React.lazy(() => import("../pages/redux")) }]
   }
];

export default routes;
