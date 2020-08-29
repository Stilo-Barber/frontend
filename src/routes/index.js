import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import Login from "../pages/login";
import Index from "../pages/index";
import Register from "../pages/register";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" exact component={Index} isProtected />
    </Switch>
  );
};

export default Routes;
