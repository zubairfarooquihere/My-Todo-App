import React from "react";
import classes from './Home.module.scss';

import Tabs from "../../Components/Home/Tabs/Tabs";
import TodoLists from "../../Components/Home/TodoLists/TodoLists";
export default function Home() {

  return (
    <>
      <div className={classes.homePage}>
        <Tabs />
        <div className={classes.homePage__todoLand}>
          <div className={classes['homePage__todoLand--two']}>
            <TodoLists />
          </div>
        </div>
      </div>
    </>
  );
}
