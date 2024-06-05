import React from "react";
import classes from "./TodoLists.module.scss";

import TodoList from "./TodoList/TodoList";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

function TodoLists(props) {
  const { arr, todoListSlice } = props;
  return (
    <div className={classes.TodoLists}>
      <SortableContext id='main' items={arr} strategy={horizontalListSortingStrategy}>
        {arr.map((id) => {
          const list = todoListSlice[id];
          // console.log(list.allTaskIds);
          return <TodoList key={id} id={id} allTaskIds={list.allTaskIds} todoListSlice={todoListSlice} todo={list} />;
        })}
      </SortableContext>
    </div>
  );
}

export default TodoLists;
