import React, { useEffect, useState } from "react";
import classes from "./TodoLists.module.scss";

import TodoList from "./TodoList/TodoList";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { TodoListSliceActions } from '../../../store/TodoList-slice';
import { TabsActions } from '../../../store/Tabs-slice';

function TodoLists(props) {
  const { idsList, setTodoList, mainTabSelectedData, subTabSelectedID } = props;
  const dispatch = useDispatch();
  const todoListSlice = useSelector((state) => state.TodoListSlice.todoList);

  useEffect(()=>{
    // setTodoIds(idsList)
  },[idsList]);

  const addTodo = (mainTab, subTab) => {
    const _id = Math.random().toString(36).substr(2, 9);
    const newTodo = {_id, title: 'New Todo', mainTab, subTab, tasks: {}, allTaskIds: []}
    //add new todo
    dispatch(TodoListSliceActions.addNewTodo({newTodo}));
    //add todoId in sub tab
    dispatch(TabsActions.addNewTodoInSubTab({mainTabId: mainTab, subTabId: subTab, newTodoId: newTodo._id}));
    //reset list
    const list = [...idsList];
    list.push(newTodo._id);
    setTodoList(list)
  }

  return (
    <>
    <div className={classes.addbutton}>
      <button onClick={()=>{addTodo(mainTabSelectedData._id, subTabSelectedID)}}>Add Todo</button>
    </div>
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
    </>
  );
}

export default TodoLists;
