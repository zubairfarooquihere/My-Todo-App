import React, { useState } from "react";
import classes from "./Header.module.scss";

import { ImCross } from "react-icons/im";
import { RxDragHandleDots2 } from "react-icons/rx";

let cls = classes['header__taskCountSection--listStatus-activeList'];

function Header(props) {
  const { name, setNodeRef, attributes, listeners } = props;
  const [value, setValue] = useState(name);
  const [status, setStatus] = useState('All');

  return (
    <>
    <div className={classes.header}>
      <div className={classes.header__titleSection}>
        <input onChange={(e)=>{setValue(e.target.value)}} className={classes['header__titleSection--title']} value={value} />
        <button className={classes['header__titleSection--Button']}>
          <span ref={setNodeRef} {...attributes} {...listeners} style={{fontSize: '1.3rem'}}><RxDragHandleDots2 /></span>
          <span><ImCross /></span>
        </button>
      </div>
      <div className={classes.header__taskCountSection}>
        <div className={classes['header__taskCountSection--taskCount']}>2 Task</div>
        <div className={classes['header__taskCountSection--listStatus']}>
            <div onClick={()=>{setStatus('All')}} className={`${classes['header__taskCountSection--listStatus-list']} ${status === 'All' ? cls : ''}`}>All</div>
            <div onClick={()=>{setStatus('Active')}} className={`${classes['header__taskCountSection--listStatus-list']} ${status === 'Active' ? cls : ''}`}>Active</div>
            <div onClick={()=>{setStatus('Completed')}} className={`${classes['header__taskCountSection--listStatus-list']} ${status === 'Completed' ? cls : ''}`}>Completed</div>
        </div>
      </div>
      <div className={classes.header__taskInputSection}>
        <input placeholder="Add a new task..."/>
      </div>
    </div>
    <div className={classes.border} />
    </>
  );
}

export default Header;
