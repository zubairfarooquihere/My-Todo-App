import React from 'react'
import classes from './TodoList.module.scss';

import Header from './Header/Header';
function TodoList() {
  return (
    <div className={classes.TodoList}>
      <Header />
    </div>
  )
}

export default TodoList