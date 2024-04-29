import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";

import classes from './RouteLayout.module.scss'

function RouteLayout() {
  return (
    <>
      <div className={classes.RouteLayout}>
        <Navigation />
        <Outlet />
      </div>
    </>
  );
}

export default RouteLayout;