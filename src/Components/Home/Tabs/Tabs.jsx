import React,{useState, useEffect} from 'react'
import classes from './Tabs.module.scss'

import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import Subtabs from './Subtabs/Subtabs';
import OptionMainTab from './OptionMainTab/OptionMainTab';
import InfoWidget from './InfoWidget/InfoWidget';

import { AnimatePresence } from 'framer-motion';
import { useSelector } from "react-redux";

function Tabs() {
  const tabsData = useSelector((state) => state.TabsSlice.tabsData);
  const [infoWidget, setInfoWidget] = useState(false);
  const [openMainTabOption, setOpenMainTabOption] = useState(false);
  const [allMainTabsIDs, setAllMainTabs] = useState([]);
  const [mainTabSelectedData, setMainTabSelected] = useState(null);//tabsData['#@123']
  const [subTabSelectedID, setSubTabSelected] = useState(null);

  useEffect(()=>{
    let gotMainTabsId = tabsData['MainTabs'];
    setAllMainTabs(gotMainTabsId);
    const AllMaintabsId = gotMainTabsId.map((id) => tabsData[id]);
    let maintabSelected = AllMaintabsId[0];
    if(mainTabSelectedData){
      maintabSelected = tabsData[mainTabSelectedData._id]
    }
    setMainTabSelected(maintabSelected);
    const AllSubTabs = maintabSelected['subTab'];
    if(AllSubTabs.length > 0) {
      const SubtabSelected = AllSubTabs[0];
      setSubTabSelected(SubtabSelected._id);
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
      return {...tab, subTab: gotSubTab}
    })
  }

  const handleDragEnd2 = (event) => {
    console.log('DRAG DRAG DRAG');
    const { active, over } = event;
    if (active.id === over.id) return;
    const originalPos = allMainTabsIDs.findIndex((id) => id === active.id);
    const newPos = allMainTabsIDs.findIndex((id) => id === over.id);
    setAllMainTabs((array) => {
      let gotSubTab = arrayMove(array, originalPos, newPos);
      return gotSubTab;
    })
  }

  return (
    <>
      <AnimatePresence mode='wait'>
        {infoWidget && <InfoWidget tabsData={tabsData} mainTabSelectedData={mainTabSelectedData} setInfoWidget={setInfoWidget} />}
      </AnimatePresence>
      <div className={classes.tabs}>
        <DndContext id="subtab" collisionDetection={closestCorners} onDragEnd={handleDragEnd} >
          {mainTabSelectedData && <Subtabs mainTabSelectedData={mainTabSelectedData} subTabSelectedID={subTabSelectedID} setSubTabSelected={setSubTabSelected} />}
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