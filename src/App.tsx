import "./styles.css";

import BasicLayout from "./Layout/BasicLayout";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <BasicLayout />;
    </Router>
  );
}
