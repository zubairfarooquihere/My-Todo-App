import React, { useEffect, useState } from "react";
import classes from "./Task.module.scss";

import { RxCross1 } from "react-icons/rx";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

import { RxDragHandleDots2 } from "react-icons/rx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useDispatch } from "react-redux";
import { TodoListSliceActions } from '../../../../../../store/TodoList-slice';

let success = classes['task__success'];

function Task(props) {
  const { taskTitle, id, todo, taskStatus, setTaskList } = props; 
  const dispatch = useDispatch();
  const [title, setTitle] = useState(taskTitle);
  const [status, setStatus] = useState(taskStatus);

  // let id = taskTitle;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transition, transform: CSS.Transform.toString(transform) };

  const changeStatus = () => {
    let changedStatus = status === 'active' ? 'completed' : 'active';
    setStatus(changedStatus)
    const allTaskIds = [...todo.allTaskIds];
    const index = allTaskIds.indexOf(id);
    if (index > -1) {
      allTaskIds.splice(index, 1);
      if (changedStatus === "completed") {
        allTaskIds.push(id);
      } else {
        allTaskIds.unshift(id);
      }
      setTaskList(allTaskIds);
      dispatch(TodoListSliceActions.taskStatusUpdate({todoListId: todo._id, taskId: id, newAllTaskIds: allTaskIds, status: changedStatus}));
    }
  }

  const deleteTask = (taskId) => {
    const taskIds = [...todo.allTaskIds]
    const index = taskIds.indexOf(taskId);
    if (index > -1) {
      taskIds.splice(index, 1);
      setTaskList(taskIds);
      dispatch(TodoListSliceActions.deleteTask({todoId: todo._id, taskId: taskId, taskListIds: taskIds}));
    }
  }

  const updatetitle = () => {
    dispatch(TodoListSliceActions.taskTitleUpdate({todoListId: todo._id, taskId: id, newTitle: title}));
  }

  return (
    <>
    <div id={id} style={style} className={status === 'active' ? classes['task'] : `${classes['task']} ${success}`}>
      <span ref={setNodeRef} {...attributes} {...listeners} className={classes.handleBar}><RxDragHandleDots2 /></span>
      <span onClick={changeStatus} className={classes.checkmark} >{status === 'active' ? <FaRegCircle />: <FaRegCheckCircle />}</span>
      <input onChange={(e)=>{setTitle(e.target.value)}} onBlur={updatetitle} className={classes.task__name} value={title} />
      <button onClick={()=>{deleteTask(id)}} className={classes.task__button}><RxCross1 /></button>
    </div>
    </>
  );
}

export default Task;
