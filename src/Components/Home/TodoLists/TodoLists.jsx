import React, { useEffect, useState } from "react";
import classes from "./TodoLists.module.scss";

import TodoList from "./TodoList/TodoList";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

import { useSelector } from "react-redux";

function TodoLists(props) {
  const { idsList, setTodoList } = props;
  const todoListSlice = useSelector((state) => state.TodoListSlice.todoList);
  // console.log(todosIds);
  useEffect(()=>{
    // setTodoIds(idsList)
  },[idsList]);

  return (
    <div className={classes.TodoLists}>
      <SortableContext id='main' items={idsList} strategy={horizontalListSortingStrategy}>
        {idsList.map((id) => {
          const list = todoListSlice[id];
          if(list){
            return <TodoList key={id} todosIds={idsList} setTodoList={setTodoList} id={id} allTaskIds={list.allTaskIds} todoListSlice={todoListSlice} todo={list} />;
          }else{
            console.error(`error with todo id: ${id}`);
          }
        })}
      </SortableContext>
    </div>
  );
}

export default TodoLists;
