import React,{ useMemo } from 'react'
import Subtab from './Subtab';
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { FaCirclePlus } from "react-icons/fa6";
import classes from './Subtabs.module.scss';
function Subtabs(props) {
  const {mainTabSelectedData, setSubTabSelected, subTabSelectedID, addsubtab} = props;

  return (
    <>
    <div className={classes.subtab}>
      <SortableContext id='subtab' items={mainTabSelectedData.subTab} strategy={horizontalListSortingStrategy}>
        {mainTabSelectedData.subTab.map((tab, index) => {
          let gotclass = `${classes['subtab--tab']}`;
          if(tab._id === subTabSelectedID) {gotclass = `${classes['subtab--tab']} ${classes['subtab--tab--selected']}`;}
          return <Subtab key={tab._id} id={tab._id} title={tab.title} gotclass={gotclass} onclickFunc={()=>{setSubTabSelected(tab._id)}} />
        })}
      </SortableContext>
      <span key={'addsubtab'} onClick={addsubtab} className={`${classes['subtab--tab']} ${classes['subtab--tab--addoption']}`}><FaCirclePlus /></span>
    </div>
    </>
  )
}

export default Subtabs;
////(<span key={tab._id} onClick={()=>{setSubTabSelected(tab._id)}} className={`${classes['tabs__subtab--tab']}`}>{tab.title}</span>);