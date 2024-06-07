import React,{useState, useEffect} from 'react'
import classes from './Tabs.module.scss'

import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import Subtabs from './Subtabs/Subtabs';
import OptionMainTab from './OptionMainTab/OptionMainTab';
import InfoWidget from './InfoWidget/InfoWidget';

import { AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from "react-redux";
import { TabsActions } from '../../../store/Tabs-slice';

function Tabs(props) {
  const { setTodoList } = props;
  const dispatch = useDispatch();
  const tabsData = useSelector((state) => state.TabsSlice.tabsData);
  const [infoWidget, setInfoWidget] = useState(false);
  const [openMainTabOption, setOpenMainTabOption] = useState(false);
  const [allMainTabsIDs, setAllMainTabs] = useState([]);
  const [mainTabSelectedData, setMainTabSelected] = useState(null);//tabsData['#@123']
  const [subTabSelectedID, setSubTabSelected] = useState(null);

  useEffect(()=>{
    let gotMainTabsId = tabsData['MainTabs'];
    setAllMainTabs(gotMainTabsId);
    if(gotMainTabsId.length > 0){
      const AllMaintabsId = gotMainTabsId.map((id) => tabsData[id]);
      let maintabSelected = AllMaintabsId[0];
      if(mainTabSelectedData && tabsData[mainTabSelectedData._id]){
        maintabSelected = tabsData[mainTabSelectedData._id]
      }
      setMainTabSelected(maintabSelected);
      const AllSubTabs = maintabSelected['subTab'];
      if(AllSubTabs.length > 0) {
        if(subTabSelectedID && mainTabSelectedData && tabsData[mainTabSelectedData._id].subTab.some(item => item._id === subTabSelectedID)){
          
        }else{
          const SubtabSelected = AllSubTabs[0];
          setSubTabSelected(SubtabSelected._id);
          // console.log(SubtabSelected.todos);
          setTodoList(SubtabSelected.todos)
        }
      }
    }else{
      setMainTabSelected(null);
      setSubTabSelected(null);
      setTodoList([]);
    }
  },[tabsData]); 

  const getTaskPos = (id, array) => array.findIndex((task) => task._id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    const originalPos = getTaskPos(active.id, mainTabSelectedData.subTab);
    const newPos = getTaskPos(over.id, mainTabSelectedData.subTab);
    setMainTabSelected((tab) => {
      let gotSubTab = arrayMove(tab.subTab, originalPos, newPos);
      dispatch(TabsActions.reorderSubTab({mainTabId: mainTabSelectedData._id, newList: gotSubTab}));
      return {...tab, subTab: gotSubTab}
    })
  }

  const handleDragEnd2 = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    const originalPos = allMainTabsIDs.findIndex((id) => id === active.id);
    const newPos = allMainTabsIDs.findIndex((id) => id === over.id);
    setAllMainTabs((array) => {
      let gotSubTab = arrayMove(array, originalPos, newPos);
      dispatch(TabsActions.reorderMainTab({mainTabId: mainTabSelectedData._id, newList: gotSubTab}));
      return gotSubTab;
    })
  }

  return (
    <>
      <AnimatePresence mode='wait'>
        {infoWidget && <InfoWidget tabsData={tabsData} mainTabSelectedData={mainTabSelectedData} setMainTabSelected={setMainTabSelected} setInfoWidget={setInfoWidget} />}
      </AnimatePresence>
      <div className={classes.tabs}>
        <DndContext id="subtab" collisionDetection={closestCorners} onDragEnd={handleDragEnd} >
          {mainTabSelectedData && <Subtabs mainTabSelectedData={mainTabSelectedData} subTabSelectedID={subTabSelectedID} setSubTabSelected={setSubTabSelected} setTodoList={setTodoList} />}
        </DndContext>
        <div className={classes.tabs__maintab}>
          <span onClick={()=>{setOpenMainTabOption(true)}} className={`${classes['tabs__maintab--tab']}`}>{mainTabSelectedData && mainTabSelectedData.title}</span>
          {openMainTabOption && 
            (<DndContext id="maintaboptions" collisionDetection={closestCorners} onDragEnd={handleDragEnd2} >
              <OptionMainTab setInfoWidget={setInfoWidget} tabsData={tabsData} allMainTabsIDs={allMainTabsIDs} setSubTabSelected={setSubTabSelected} mainTabSelectedData={mainTabSelectedData} setOpenMainTabOption={setOpenMainTabOption} setMainTabSelected={setMainTabSelected} />
             </DndContext>
            )
          }
        </div>
      </div>
    </>
  );
}

export default Tabs