import React from "react";
import { FaHandPointLeft } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function Option(props) {
  const { tab, classes, onclickFunc, selected } = props;
  let id = tab._id
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id});
  
  const style = { transition, transform: CSS.Transform.toString(transform) };
  return (
    <>
      <div
        key={tab._id}
        id={tab._id}
        onDoubleClick={onclickFunc}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${classes["options--item"]}`}
      >
        <span className={`${classes["options--item--title"]}`}>
          {tab.title}
        </span>
        {selected && (
          <span className={`${classes["options--item--icon"]}`}>
            <FaHandPointLeft />
          </span>
        )}
      </div>
    </>
  );
}

export default Option;
