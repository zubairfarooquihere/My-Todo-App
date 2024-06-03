import React from "react";
import classes from "./TodoList.module.scss";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Header from "./Header/Header";
import TaskList from "./TaskList/TaskList";
function TodoList(props) {
  const { name } = props;
  let id = name;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = { transition, transform: CSS.Transform.toString(transform) };
  return (
    <div
      key={id}
      id={id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={classes.TodoList}
    >
      <Header name={name} />
      <TaskList />
    </div>
  );
}

export default TodoList;
