import React from "react";
import { Switch, Route } from "react-router-dom";
import { Clients } from "../pages/Clients";
import { Dashboard } from "../pages/Dashboard";
import { EditProfile } from "../pages/EditProfile";
import { Products } from "../pages/Products";
import { Sales } from "../pages/Sales";
import { CLIENTS, EDIT_PROFILE, PRODUCTS, ROOT, SALES } from "./CONSTANTS";

export const RouterConfig = () => {
  return (
    <Switch>
      <Route exact path={ROOT} component={Dashboard} />
      <Route path={PRODUCTS} component={Products} />
      <Route path={CLIENTS} component={Clients} />
      <Route path={SALES} component={Sales} />
      <Route path={EDIT_PROFILE} component={EditProfile} />
    </Switch>
  );
};
