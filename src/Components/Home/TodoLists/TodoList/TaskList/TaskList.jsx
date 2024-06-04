import React, { useState } from "react";
import classes from "./TaskList.module.scss";

import Task from "./Task/Task";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

function TaskList(props) {
  const { list } = props;

  return (
    <div className={classes.taskList}>
      <SortableContext id='TaskList' items={list} strategy={verticalListSortingStrategy}>
        {list.map((task)=>{
          return (<Task key={task} taskTitle={task} />)
        })}
      </SortableContext>
    </div>
  );
}

export default TaskList;
