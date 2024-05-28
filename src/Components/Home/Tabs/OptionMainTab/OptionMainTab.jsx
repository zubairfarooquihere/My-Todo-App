import React,{ useState, useEffect, useRef } from 'react'
import classes from './OptionMainTab.module.scss';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { BsInfoCircle } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { TabsActions } from '../../../../store/Tabs-slice';
import Option from './Option';
function OptionMainTab(props) {
  const dispatch = useDispatch();
  const { setInfoWidget, tabsData, allMainTabsIDs, mainTabSelectedData, setOpenMainTabOption, setMainTabSelected, setSubTabSelected} = props;
  const optionsRef = useRef(null);
  const [newMainTab, setnewMainTab] = useState('');

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

  const addMainTab = (title) => {
    if(title.trim() !== '') {
      dispatch(TabsActions.addMainTab({title: title}));
      setnewMainTab('');
    }
  }

  return (
    <>
      <div ref={optionsRef} className={`${classes['options']}`}>
        <span onClick={()=>{setInfoWidget(true); setOpenMainTabOption(false);}} className={`${classes['info']}`}><BsInfoCircle /></span>
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
        <div key={'AddMainTab'} className={`${classes["options--item"]}`} >
          <input onKeyDown={(event)=>{if(event.key === 'Enter'){addMainTab(newMainTab)}}} onChange={(event)=>{setnewMainTab(event.target.value)}} value={newMainTab} className={`${classes["options--item--input"]}`} />
          <span onClick={()=>{addMainTab(newMainTab)}} className={`${classes["options--item--addSign"]}`}>
            <FaPlus />
          </span>
        </div>
      </div>
    </>
  )
}

export default OptionMainTab