import React, { useState } from "react";
import classes from "./Header.module.scss";
import { ImCross } from "react-icons/im";

let cls = classes['header__taskCountSection--listStatus-activeList'];

function Header(props) {
  const { name } = props;
  const [value, setValue] = useState('Todo List');

  return (
    <>
    <div className={classes.header}>
      <div className={classes.header__titleSection}>
        <input onChange={(e)=>{setValue(e.target.value)}} className={classes['header__titleSection--title']} value={name} />
        <button className={classes['header__titleSection--crossButton']}><ImCross /></button>
      </div>
      <div className={classes.header__taskCountSection}>
        <div className={classes['header__taskCountSection--taskCount']}>2 Task</div>
        <div className={classes['header__taskCountSection--listStatus']}>
            <div className={`${classes['header__taskCountSection--listStatus-list']} ${cls}`}>All</div>
            <div className={`${classes['header__taskCountSection--listStatus-list']} `}>Active</div>
            <div className={`${classes['header__taskCountSection--listStatus-list']} `}>Completed</div>
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
