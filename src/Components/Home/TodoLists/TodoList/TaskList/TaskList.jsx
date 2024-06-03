import React from "react";
import classes from "./TaskList.module.scss";

import Task from "./Task/Task";

function TaskList() {
  return (
    <div className={classes.taskList}>
      <Task />
    </div>
  );
}

export default TaskList;
