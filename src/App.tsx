import "./styles.css";

import {
  Route,
  RouteComponentProps,
  RouteProps,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { renderRoutes } from "./utils/utils";
import routes from "./routes";



export default function App() {
   return (
    <Router>
      {renderRoutes(routes)}
    </Router>
  );
}
