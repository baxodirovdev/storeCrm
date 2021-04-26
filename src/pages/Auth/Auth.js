import React from "react";

import { Switch, Route } from "react-router-dom";
import { ROOT, SIGNUP } from "../../navigation/CONSTANTS";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

import "../../styles/Auth.css";

export const Auth = () => {
  return (
    <div className="auth">
      <Switch>
        <Route exact path={ROOT} component={Login} />
        <Route path={SIGNUP} component={SignUp} />
      </Switch>
    </div>
  );
};
