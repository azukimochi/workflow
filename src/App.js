import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WorkflowList from "./pages/WorkflowList/WorkflowList.js"
import AdminPage from "./pages/AdminPage/AdminPage.js"
import Footer from "./components/Footer/Footer"

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={AdminPage} />
        <Route exact path="/workflow" component={WorkflowList} />
        <Route exact path="*" component={AdminPage} />
      </Switch>
    <Footer />
    </div>
  </Router>
);

export default App;

