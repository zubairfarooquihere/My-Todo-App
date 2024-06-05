import React, { useEffect, useState } from "react";
import classes from "./Task.module.scss";

import { RxCross1 } from "react-icons/rx";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

import { RxDragHandleDots2 } from "react-icons/rx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

let success = classes['task__success'];

function Task(props) {
  const { taskTitle, id } = props; 
  const [title, setTitle] = useState(taskTitle);
  const [status, setStatus] = useState('active');

  // let id = taskTitle;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transition, transform: CSS.Transform.toString(transform) };

  const changeStatus = () => {
    setStatus(status === 'active' ? 'completed' : 'active')
  }

  return (
    <>
    <div id={id} style={style} className={status === 'active' ? classes['task'] : `${classes['task']} ${success}`}>
      <span ref={setNodeRef} {...attributes} {...listeners} className={classes.handleBar}><RxDragHandleDots2 /></span>
      <span onClick={changeStatus} className={classes.checkmark} >{status === 'active' ? <FaRegCircle />: <FaRegCheckCircle />}</span>
      <input onChange={(e)=>{setTitle(e.target.value)}} className={classes.task__name} value={title} />
      <button className={classes.task__button}><RxCross1 /></button>
    </div>
    </>
  );
}

export default Task;
