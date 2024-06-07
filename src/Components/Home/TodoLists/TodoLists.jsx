import React, { useEffect, useState } from "react";
import classes from "./TodoLists.module.scss";

import TodoList from "./TodoList/TodoList";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

import { useSelector } from "react-redux";

function TodoLists(props) {
  const { idsList } = props;
  const [todosIds, setTodoIds] = useState(idsList);
  const todoListSlice = useSelector((state) => state.TodoListSlice.todoList);
  // console.log(todosIds);
  useEffect(()=>{
    setTodoIds(idsList)
  },[idsList]);

  return (
    <div className={classes.TodoLists}>
      <SortableContext id='main' items={todosIds} strategy={horizontalListSortingStrategy}>
        {todosIds.map((id) => {
          const list = todoListSlice[id];
          return <TodoList key={id} id={id} allTaskIds={list.allTaskIds} todoListSlice={todoListSlice} todo={list} />;
        })}
      </SortableContext>
    </div>
  );
}

export default TodoLists;
