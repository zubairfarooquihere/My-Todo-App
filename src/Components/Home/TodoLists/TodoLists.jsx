import React from "react";
import classes from "./TodoLists.module.scss";

import TodoList from "./TodoList/TodoList";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

function TodoLists(props) {
  const { arr } = props;
  return (
    <div className={classes.TodoLists}>
      <SortableContext id='main' items={arr} strategy={verticalListSortingStrategy}>
        {arr.map((todo) => {
          return <TodoList key={todo} name={todo} />;
        })}
      </SortableContext>
    </div>
  );
}

export default TodoLists;
