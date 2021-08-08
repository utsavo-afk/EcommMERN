import React from "react";
import { Route, Redirect } from "react-router";
import authHelper from "../auth-helper";

function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return authHelper.isAdmin() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
}

export default AdminRoute;
