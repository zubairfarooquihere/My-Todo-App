import React from "react";
import { Outlet } from "react-router-dom";
import classes from './RouteLayout.module.scss'

function RouteLayout() {
  return (
    <>
      <div className={classes.RouteLayout}>
        <div>Home About Setting</div>
        <Outlet />
      </div>
    </>
  );
}

export default RouteLayout;