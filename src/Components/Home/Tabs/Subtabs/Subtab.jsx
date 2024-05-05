import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Subtab(props) {
    const { id, title, onclickFunc, gotclass } = props;
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
    const style = { transition, transform: CSS.Transform.toString(transform) };
    
    return (
      <span
        key={id}
        id={id}
        onDoubleClick={onclickFunc}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}  // Spread listeners after onClick
        className={gotclass}
      >
        {title}
      </span>
    );
}

export default Subtab;
