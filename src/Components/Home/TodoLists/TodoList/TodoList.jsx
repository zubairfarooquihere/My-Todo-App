import React, { useState } from "react";
import classes from "./TodoList.module.scss";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayMove } from "@dnd-kit/sortable";

import Header from "./Header/Header";
import TaskList from "./TaskList/TaskList";

import { useDispatch } from "react-redux";
import { TodoListSliceActions } from '../../../../store/TodoList-slice';

function TodoList(props) {
  const { id, todosIds, setTodoList, allTaskIds, todo } = props;
  const dispatch = useDispatch();
  const [list, setList] = useState(allTaskIds);
  const [displayList, setDisplayList] = useState('All');

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transition, transform: CSS.Transform.toString(transform) };
  const getTaskPos = (id, array) => array.findIndex((task) => task === id);


  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    const originalPos = getTaskPos(active.id, list);
    const newPos = getTaskPos(over.id, list);
    let gotSubTab = arrayMove(list, originalPos, newPos);
    setList(gotSubTab);
    dispatch(TodoListSliceActions.sortTaskList({todoId: id, taskListIds: gotSubTab}));
  }

  const getDisplayList = (value) => {
    setDisplayList(value);
  }

  return (
    <div id={id} style={style} className={classes.TodoList}>
      <Header id={id} todo={todo} todosIds={todosIds} setTodoList={setTodoList} todoList={allTaskIds} name={todo.title} taskList={list} setTaskList={setList} setNodeRef={setNodeRef} attributes={attributes} listeners={listeners} getDisplayList={getDisplayList} />
      <DndContext id="TaskList" collisionDetection={closestCorners} onDragEnd={handleDragEnd} >
        <TaskList list={list} todo={todo} setList={setList} displayList={displayList} />
      </DndContext>
    </div>
  );
}

export default TodoList;
