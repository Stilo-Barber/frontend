import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import Login from "../pages/login";
import Index from "../pages/index";
import Register from "../pages/register";
import Admin from "../pages/admin";
import Barbers from "../pages/admin/barbers";
import Services from "../pages/admin/services";



const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" exact component={Index} isProtected />
      <Route path="/admin" component={Admin} isProtected isAdminProtected exact />
      <Route path="/admin/barbers" component={Barbers} isProtected isAdminProtected />
      <Route path="/admin/services" component={Services} isProtected isAdminProtected />
    </Switch>
  );
};

export default Routes;
