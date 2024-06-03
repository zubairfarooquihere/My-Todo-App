import React, { useState } from "react";
import classes from './Home.module.scss';

import Tabs from "../../Components/Home/Tabs/Tabs";
import TodoLists from "../../Components/Home/TodoLists/TodoLists";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

let arr = [1, 2, 3, 4];

export default function Home() {
  const [list, setList] = useState(arr);
  const getTaskPos = (id, array) => array.findIndex((task) => task === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    const originalPos = getTaskPos(active.id, list);
    const newPos = getTaskPos(over.id, list);
    let gotSubTab = arrayMove(list, originalPos, newPos);
    setList(gotSubTab);
  }

  return (
    <>
      <div className={classes.homePage}>
        <Tabs />
          <div className={classes.homePage__todoLand}>
            <div className={classes['homePage__todoLand--two']}>
              <DndContext id="main" collisionDetection={closestCorners} onDragEnd={handleDragEnd} >
                <TodoLists arr={list} />
              </DndContext>
            </div>
          </div>
      </div>
    </>
  );
}
