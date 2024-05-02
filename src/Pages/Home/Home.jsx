import React from "react";
import classes from './Home.module.scss';

import Tabs from "../../Components/Home/Tabs/Tabs";

export default function Home() {

  return (
    <>
      <div className={classes.homePage}>
        <Tabs />
      </div>
    </>
  );
}
