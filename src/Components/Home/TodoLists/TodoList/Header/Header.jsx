import React, { useState } from "react";
import classes from "./Header.module.scss";

import { ImCross } from "react-icons/im";
import { RxDragHandleDots2 } from "react-icons/rx";

import { useDispatch } from "react-redux";

import { TabsActions } from '../../../../../store/Tabs-slice';
import { TodoListSliceActions } from '../../../../../store/TodoList-slice';

let cls = classes['header__taskCountSection--listStatus-activeList'];

function Header(props) {
  const { id, todo, todosIds,  setTodoList, name, taskList, setTaskList, setNodeRef, attributes, listeners, getDisplayList } = props;

  const dispatch = useDispatch();
  const [title, settitle] = useState(name);
  const [status, setStatus] = useState('All');
  const [task, setTask] = useState('');

  const changeTitile = () => {
    dispatch(TodoListSliceActions.todoListTitleChange({todoListId: id, title: title}));
  }

  const deleteTodo = (todoId) => {
    const TList = [...todosIds];
    const index = TList.findIndex((id) => id === todoId);
    if(index === 0 || index){
      TList.splice(index, 1);
      //reset todosIds
      setTodoList(TList);
      //remove from subtab
      const {mainTab, subTab} = todo
      dispatch(TabsActions.deleteTodoIdInSubTab({mainTabId: mainTab, subTabId: subTab, todoId: todoId}));
      //delete todo
      dispatch(TodoListSliceActions.deleteTodo({todoId: todoId}));
    }
  }

  const addTask = (task) => {
    const _id = Math.random().toString(36).substr(2, 9);
    const TList = [...taskList];
    // console.log(TList);
    const taskObj =  { _id: _id, title: task, status: 'active' }
    TList.unshift(_id)
    dispatch(TodoListSliceActions.addTask({todoId: id, taskObj: taskObj, taskListIds: TList}));
    setTaskList(TList)
    setTask('');
  }

  return (
    <>
    <div className={classes.header}>
      <div className={classes.header__titleSection}>
        <input onChange={(e)=>{settitle(e.target.value)}} onBlur={changeTitile} className={classes['header__titleSection--title']} value={title} />
        <button className={classes['header__titleSection--Button']}>
          <span ref={setNodeRef} {...attributes} {...listeners} style={{fontSize: '1.3rem'}}><RxDragHandleDots2 /></span>
          <span onClick={()=>{deleteTodo(id)}}><ImCross /></span>
        </button>
      </div>
      <div className={classes.header__taskCountSection}>
        <div className={classes['header__taskCountSection--taskCount']}>{taskList.length} Task</div>
        <div className={classes['header__taskCountSection--listStatus']}>
          <div onClick={()=>{setStatus('All'); getDisplayList('All');}} className={`${classes['header__taskCountSection--listStatus-list']} ${status === 'All' ? cls : ''}`}>All</div>
          <div onClick={()=>{setStatus('Active'); getDisplayList('Active');}} className={`${classes['header__taskCountSection--listStatus-list']} ${status === 'Active' ? cls : ''}`}>Active</div>
          <div onClick={()=>{setStatus('Completed'); getDisplayList('Completed');}} className={`${classes['header__taskCountSection--listStatus-list']} ${status === 'Completed' ? cls : ''}`}>Completed</div>
        </div>
      </div>
      <div className={classes.header__taskInputSection}>
        <input onKeyDown={(event)=>{if(event.key === 'Enter'){addTask(task)}}} value={task} onChange={(e)=>{setTask(e.target.value)}} placeholder="Add a new task..."/>
      </div>
    </div>
    <div className={classes.border} />
    </>
  );
}

export default Header;
