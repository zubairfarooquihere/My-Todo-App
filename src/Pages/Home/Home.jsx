import React, { useState } from "react";
import classes from './Home.module.scss';

import Tabs from "../../Components/Home/Tabs/Tabs";
import TodoLists from "../../Components/Home/TodoLists/TodoLists";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { useDispatch } from "react-redux";
import { TabsActions } from '../../store/Tabs-slice';

export default function Home() {
  // const todoListSlice = useSelector((state) => state.TodoListSlice.todoList);
  const [mainTabSelectedData, setMainTabSelected] = useState(null);
  const [subTabSelectedID, setSubTabSelected] = useState(null);
  const [list, setTodoList] = useState([]);
  const dispatch = useDispatch();
  const getTaskPos = (id, array) => array.findIndex((task) => task === id);
  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    const originalPos = getTaskPos(active.id, list);
    const newPos = getTaskPos(over.id, list);
    let gotSubTab = arrayMove(list, originalPos, newPos);
    setTodoList(gotSubTab);
    console.log(';ABC');
    //find index of subtab in below function and add list in it
    dispatch(TabsActions.sortSubTabTodos({mainTabId: mainTabSelectedData._id, subTabId: subTabSelectedID, todosList: gotSubTab}));
  }

  return (
    <>
      <div className={classes.homePage}>
        <Tabs mainTabSelectedData={mainTabSelectedData} setMainTabSelected={setMainTabSelected} subTabSelectedID={subTabSelectedID} setSubTabSelected={setSubTabSelected} setTodoList={setTodoList} />
          <div className={classes.homePage__todoLand}>
            <div className={classes['homePage__todoLand--two']}>
              <DndContext id="main" collisionDetection={closestCorners} onDragEnd={handleDragEnd} >
                <TodoLists idsList={list} setTodoList={setTodoList} />
              </DndContext>
            </div>
          </div>
      </div>
    </>
  );
}
