import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import CreatePersonPage from "./pages/CreatePersonPage";
import PeoplePage from "./pages/PeoplePage";
import PersonPage from "./pages/PersonPage";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <section className="section">
        <div className="container is-fluid">
          <Router>
            <Switch>
              <Redirect exact from="/" to="/people" />
              <Route exact path="/people" component={PeoplePage} />
              <Route path="/person/:id" component={PersonPage} />
              <Route path="/create-person" component={CreatePersonPage} />
            </Switch>
          </Router>
        </div>
      </section>
    </React.Fragment>
  );
};

export default App;
