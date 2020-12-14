import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

//Single Components
import Home from "../components/screens/Home/Home";

class Routes extends Component {
    render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Redirect from="/" to="/home" />
          </Switch>
        </BrowserRouter>
      );
    }
  }

  export default connect()(Routes);
