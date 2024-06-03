import React from "react";
import classes from "./Task.module.scss";

import { RxCross1 } from "react-icons/rx";

function Task() {
  return (
    <>
      <div className={classes.task}>
        <span className={classes.checkmark} />
        <input className={classes.task__name} value={'Task'} />
        <button className={classes.task__button}><RxCross1 /></button>
      </div>
    </>
  );
}

export default Task;
