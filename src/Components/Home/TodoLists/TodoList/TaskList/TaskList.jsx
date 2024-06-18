import React, { useState } from "react";
import classes from "./TaskList.module.scss";

import Task from "./Task/Task";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

function TaskList(props) {
  const { list, todo, setList, displayList } = props;

  return (
    <div className={classes.taskList}>
      <SortableContext id='TaskList' items={list} strategy={verticalListSortingStrategy}>
        {list.map((id)=>{
          const task = todo.tasks[id];
          if(displayList === 'All' || displayList.toLowerCase() === task.status.toLowerCase()){
            return (<Task key={id} id={id} todo={todo} taskTitle={task.title} taskStatus={task.status} setTaskList={setList} />)
          }
        })}
      </SortableContext>
    </div>
  );
}

export default TaskList;
