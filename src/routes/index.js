import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import Login from "../pages/login";
import Index from "../pages/index";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Index} isProtected />
    </Switch>
  );
};

export default Routes;
