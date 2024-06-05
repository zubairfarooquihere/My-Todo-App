import React, { useState } from "react";
import classes from "./TodoList.module.scss";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayMove } from "@dnd-kit/sortable";

import Header from "./Header/Header";
import TaskList from "./TaskList/TaskList";

const arr = ['Task 1', 'Task 2', 'Task 3'];

function TodoList(props) {
  const { id, allTaskIds, todo } = props;
  // console.log(todo);
  // let id = name;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transition, transform: CSS.Transform.toString(transform) };
  const getTaskPos = (id, array) => array.findIndex((task) => task === id);

  const [list, setList] = useState(allTaskIds);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    const originalPos = getTaskPos(active.id, list);
    const newPos = getTaskPos(over.id, list);
    let gotSubTab = arrayMove(list, originalPos, newPos);
    setList(gotSubTab);
  }

  return (
    <div id={id} style={style} className={classes.TodoList}>
      <Header name={todo.title} setNodeRef={setNodeRef} attributes={attributes} listeners={listeners} />
      <DndContext id="TaskList" collisionDetection={closestCorners} onDragEnd={handleDragEnd} >
        <TaskList list={list} todo={todo} />
      </DndContext>
    </div>
  );
}

export default TodoList;
