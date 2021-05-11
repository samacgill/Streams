import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamShow from "./streams/StreamShow";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      {/* NB using Router rather than BrowswerRouter so can use our own history for programatic 
      routing. BR has own history, so would need to pass down as prop see start of 354 */}
      <Router history={history}>
        <div>
          <Header />
          {/* swith makes sure only one shows. 
          If don't use new matches wildcard of show */}
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            {/* colon is a wildcard. React-router-dom then adds this in props > match > params */}
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
