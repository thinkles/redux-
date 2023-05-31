import {
  Route,
  RouteComponentProps,
  RouteProps,
  Switch,
} from "react-router-dom";
import { RouteConfig } from "../routes";

export const renderRoutes = (routes: RouteConfig[]) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        const { path, exact, routes, component: Com } = route;
        const renderFn = (props: RouteComponentProps<any>) => (
          <Com
            {...props}
          >
            {routes ? renderRoutes(routes) : null}
          </Com>
        );

        return <Route key={i} path={path} exact={exact} render={renderFn} />;
      })}
    </Switch>
  );
};
