import {
  Redirect,
  Route,
 
  Switch,
} from "react-router-dom";
import { RouteConfig } from "../routes";

export function renderRoutes(routes: RouteConfig[]) {
  return (
    <Switch>
      {routes.map((route, i) => {
        if (route.redirect) {
          return (
            <Route key={i} path={route.path}  exact={route.exact}>
              <Redirect key={i} to={route.redirect} />;
            </Route>
          );
        } else {
          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              sensitive={route.sensitive}
              location={route.location}
              render={(props) => {                
                const Component = route.component;
                if (!Component) {
                  return null;
                }
                if (route.routes) {
                  return (
                    <Component {...props}>
                      {renderRoutes(route.routes)}
                    </Component>
                  );
                } else {
                  return <Component {...props} />;
                }
              }}
            />
          );
        }
      })}
    </Switch>
  );
}
