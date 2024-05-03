import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Subtab(props) {
    const { id, title, onclickFunc, gotclass } = props;
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
    const style = { transition, transform: CSS.Transform.toString(transform) };
    
    return (
      <span
        //onClick={onclickFunc}  // Ensure onClick is placed before listeners
        onMouseDown={onclickFunc}
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={gotclass}
        key={id}
        id={id}
        {...listeners}  // Spread listeners after onClick
      >
        {title}
      </span>
    );
}

export default Subtab;
