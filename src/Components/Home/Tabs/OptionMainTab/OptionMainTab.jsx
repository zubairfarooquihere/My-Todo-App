import React,{ useEffect, useRef } from 'react'
import classes from './OptionMainTab.module.scss';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Option from './Option';
function OptionMainTab(props) {
  const { tabsData, allMainTabsIDs, mainTabSelectedData, setOpenMainTabOption, setMainTabSelected, setSubTabSelected} = props;
  const optionsRef = useRef(null);

  useEffect(()=>{
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOpenMainTabOption(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[]); 

  return (
    <>
      <div ref={optionsRef} className={`${classes['options']}`}>
      <SortableContext id='maintaboptions' items={allMainTabsIDs} strategy={verticalListSortingStrategy}>
        {allMainTabsIDs.map((id, index) => {
            const tab = tabsData[id];
            let onclickFunc = () =>{setMainTabSelected(tab); setSubTabSelected(()=>{if(tab['subTab'].length > 0){return tab['subTab'][0]._id}return null;}); setOpenMainTabOption(false)};
            let selected = false;
            if(mainTabSelectedData && mainTabSelectedData._id === tab._id) {
                onclickFunc = () =>{setOpenMainTabOption(false)};
                selected = true;
            }
            return <Option key={tab._id} tab={tab} onclickFunc={onclickFunc} selected={selected} classes={classes} />
        })}
        </SortableContext>
      </div>
    </>
  )
}

export default OptionMainTab