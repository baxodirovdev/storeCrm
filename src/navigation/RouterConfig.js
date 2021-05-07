import React from "react";
import { Switch, Route } from "react-router-dom";
import { Clients } from "../pages/Clients";
import { About } from "../pages/About";
import { EditProfile } from "../pages/EditProfile";
import { NewSales } from "../pages/NewSales";
import { Products } from "../pages/Products";
import { Sale } from "../pages/Sale";
import { Sales } from "../pages/Sales";
import {
  CLIENTS,
  EDIT_PROFILE,
  NEW_SALE,
  PRODUCTS,
  ROOT,
  SALE,
  SALES,
} from "./CONSTANTS";

export const RouterConfig = () => {
  return (
    <Switch>
      <Route exact path={ROOT} component={About} />
      <Route path={PRODUCTS} component={Products} />
      <Route path={CLIENTS} component={Clients} />
      <Route exact path={SALES} component={Sales} />
      <Route exact path={SALE} component={Sale} />
      <Route path={NEW_SALE} component={NewSales} />
      <Route path={EDIT_PROFILE} component={EditProfile} />
    </Switch>
  );
};
