import React from "react";
import classes from "./TodoLists.module.scss";

import TodoList from "./TodoList/TodoList";

function TodoLists() {
  return (
    <div className={classes.TodoLists}>
      <TodoList />
    </div>
  );
}

export default TodoLists;
