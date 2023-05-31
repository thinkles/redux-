import "./styles.css";

import BasicLayout from "./Layout/BasicLayout";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./routes";
import {renderRoutes} from "./utils/utils";
 
export default function App() {
 
  
  return (
    <Router>
     {renderRoutes(routes)}
    </Router>
  );
}
