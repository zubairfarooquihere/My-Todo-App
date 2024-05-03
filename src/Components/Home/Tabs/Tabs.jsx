import React,{useState, useEffect} from 'react'
import classes from './Tabs.module.scss'

import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import Subtabs from './Subtabs/Subtabs';
import OptionMainTab from './OptionMainTab/OptionMainTab';

let tabsData = {
    '#@123': {_id: '#@123', title: 'Home', subTab: [{_id: '@345', title: 'Home-1', todos: []}, {_id: '@215', title: 'Home-2', todos: []}, {_id: '@652', title: 'Home-3', todos: []}]},
    '#@452': {_id: '#@452', title: 'Work', subTab: [{_id: '@987', title: 'Work-1', todos: []}, {_id: '@789', title: 'Work-2', todos: []}, {_id: '@369', title: 'Work-3', todos: []}]},
    '#@952': {_id: '#@952', title: 'Test', subTab: []},
    'MainTabs': ['#@123', '#@452', '#@952'],
};

function Tabs() {
  // const optionsRef = useRef(null);
  const [allMainTabsIDs, setAllMainTabs] = useState([]);
  const [mainTabSelectedData, setMainTabSelected] = useState(null);//tabsData['#@123']
  const [subTabSelectedID, setSubTabSelected] = useState(null);
  const [openMainTabOption, setOpenMainTabOption] = useState(false);

  useEffect(()=>{
    let gotMainTabsId = tabsData['MainTabs'];
    setAllMainTabs(gotMainTabsId);
    const AllMaintabs = gotMainTabsId.map((id) => tabsData[id]);
    const maintabSelected = AllMaintabs[0];
    setMainTabSelected(maintabSelected);
    const AllSubTabs = maintabSelected['subTab'];
    const SubtabSelected = AllSubTabs[0];
    setSubTabSelected(SubtabSelected._id);
  },[]); 


  const addsubtab = () => {
    const _id = "#"+ Math.random(10).toString(36); // Generate a random alphanumeric string
    const title = 'New Tab';
    console.log(mainTabSelectedData);
    let subtabArray = [...mainTabSelectedData.subTab];
    subtabArray.push({ _id: _id, title: title });
    tabsData = {
      ...tabsData,
      [mainTabSelectedData._id]: { ...mainTabSelectedData, subTab: [...subtabArray]}
    };
    setMainTabSelected(tabsData[mainTabSelectedData._id])
  }

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
      <div className={classes.tabs}>
        <DndContext id="subtab" collisionDetection={closestCorners} onDragEnd={handleDragEnd} >
          {mainTabSelectedData && <Subtabs classes={classes} mainTabSelectedData={mainTabSelectedData} setSubTabSelected={setSubTabSelected} subTabSelectedID={subTabSelectedID} addsubtab={addsubtab} />}
        </DndContext>
        <div className={classes.tabs__maintab}>
          <span onClick={()=>{setOpenMainTabOption(true)}} className={`${classes['tabs__maintab--tab']}`}>{mainTabSelectedData && mainTabSelectedData.title}</span>
          {openMainTabOption && 
            (<DndContext id="maintaboptions" collisionDetection={closestCorners} onDragEnd={handleDragEnd2} >
              <OptionMainTab tabsData={tabsData} allMainTabsIDs={allMainTabsIDs} setSubTabSelected={setSubTabSelected} mainTabSelectedData={mainTabSelectedData} setOpenMainTabOption={setOpenMainTabOption} setMainTabSelected={setMainTabSelected} />
             </DndContext>
            )}
        </div>
      </div>
    </>
  );
}

export default Tabs