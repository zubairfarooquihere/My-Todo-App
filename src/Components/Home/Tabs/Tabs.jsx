import React,{useState, useEffect} from 'react'
import { FaHandPointLeft } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import classes from './Tabs.module.scss'

let tabsData = {
    '#@123': {_id: '#@123', title: 'Home', subTab: [{_id: '@345', title: 'Home-1'}, {_id: '@215', title: 'Home-2'}, {_id: '@652', title: 'Home-3'}]},
    '#@452': {_id: '#@452', title: 'Work', subTab: [{_id: '@987', title: 'Work-1'}, {_id: '@789', title: 'Work-2'}, {_id: '@369', title: 'Work-3'}]},
    '#@952': {_id: '#@952', title: 'Test', subTab: []},
    'MainTabs': ['#@123', '#@452', '#@952'],
};
function Tabs() {
  const [allMainTabs, setAllMainTabs] = useState([]);
  const [mainTabSelected, setMainTabSelected] = useState(null);//tabsData['#@123']
  const [subTabSelected, setSubTabSelected] = useState(null);
  const [openMainTabOption, setOpenMainTabOption] = useState(false);

  useEffect(()=>{
    let gotMainTabsId = tabsData['MainTabs'];
    setAllMainTabs(gotMainTabsId);
    const AllMaintabs = gotMainTabsId.map((id) => tabsData[id]);
    const maintabSelected = AllMaintabs[0];
    setMainTabSelected(maintabSelected);
    const AllSubTabs = maintabSelected['subTab'];
    const SubtabSelected = AllSubTabs[0];
    setSubTabSelected(SubtabSelected);
  },[]); 

  const addsubtab = () => {
    const _id = "#"+ Math.random(10).toString(36); // Generate a random alphanumeric string
    const title = 'New Tab';
    console.log(mainTabSelected);
    let subtabArray = [...mainTabSelected.subTab];
    subtabArray.push({ _id: _id, title: title });
    tabsData = {
      ...tabsData,
      [mainTabSelected._id]: { ...mainTabSelected, subTab: [...subtabArray]}
    };
    setMainTabSelected(tabsData[mainTabSelected._id])
  }

  return (
    <>
        <div className={classes.tabs}>
          <div className={classes.tabs__subtab}>
            {mainTabSelected && mainTabSelected.subTab.map((tab, index) => {
              if(subTabSelected && tab._id === subTabSelected._id) {
                return (<span key={tab._id} className={`${classes['tabs__subtab--tab']} ${classes['tabs__subtab--tab--selected']}`}>{tab.title}</span>);
              }
              return (<span key={tab._id} onClick={()=>{setSubTabSelected(tab)}} className={`${classes['tabs__subtab--tab']}`}>{tab.title}</span>);
            })}
            <span key={'addsubtab'} onClick={addsubtab} className={`${classes['tabs__subtab--tab']} ${classes['tabs__subtab--tab--addoption']}`}><FaCirclePlus /></span>
          </div>
          <div className={classes.tabs__maintab}>
            <span onClick={()=>{setOpenMainTabOption(true)}} className={`${classes['tabs__maintab--tab']}`}>{mainTabSelected && mainTabSelected.title}</span>
            {openMainTabOption && <div className={`${classes['options']}`}>
              {allMainTabs.map((id, index) => {
                const tab = tabsData[id];
                if(mainTabSelected && mainTabSelected._id === tab._id) {
                  return (<div key={tab._id} onClick={()=>{setOpenMainTabOption(false)}} className={`${classes['options--item']}`}><span className={`${classes['options--item--title']}`}>{tab.title}</span><span className={`${classes['options--item--icon']}`}><FaHandPointLeft /></span></div>);
                }
                return (<div key={tab._id} onClick={()=>{setMainTabSelected(tab); setSubTabSelected(()=>{if(tab['subTab'].length > 0){return tab['subTab'][0]}return null;}); setOpenMainTabOption(false)}} className={`${classes['options--item']}`}><span className={`${classes['options--item--title']}`}>{tab.title}</span></div>);
              })}
            </div>}
          </div>
        </div>
    </>
  );
}

export default Tabs