import React,{ useEffect, useState } from "react";
import classes from "./InfoWidget.module.scss";

import { useDispatch } from 'react-redux';
import { TabsActions } from '../../../../store/Tabs-slice';

import Card from "../../../UI/Card/Card";
import { MdDelete } from "react-icons/md";
function InfoWidget(props) {
  const dispatch = useDispatch();
  const { tabsData, mainTabSelectedData, setInfoWidget } = props;
  const [mainTabData, setMainTabData] = useState(mainTabSelectedData);
  
  useEffect(()=>{
    setMainTabData(tabsData[mainTabData._id]);
  },[tabsData]);

  const changeSubTabName = (event, subTabId) => {
    dispatch(TabsActions.renameSubTab({mainTabId: mainTabData._id, subTabId: subTabId, newTitle: event.target.value}));
  }

  const changeMainTabName = (event, mainTabId) => {
    dispatch(TabsActions.renameMainTab({mainTabId: mainTabId, newTitle: event.target.value}));
  }

  const onChangeMainTabDetail = (event) => {
    setMainTabData(tabsData[event.target.value])
  }

  const deleteSubTab = (subTabId) => {
    dispatch(TabsActions.deleteSubTab({mainTabId: mainTabData._id, subTabId: subTabId}));
  }

  return (
    <Card onClose={()=>{setInfoWidget(false)}} className={classes.infoWidget}>
      <div className={classes.infoWidget__dropdown}>
        <select defaultValue={mainTabData._id} className={classes.infoWidget__dropdown_select}>
          {tabsData.MainTabs && tabsData.MainTabs.map((MainTabsId)=>{
            return <option onClick={onChangeMainTabDetail} key={MainTabsId} value={MainTabsId} className={classes.infoWidget__dropdown_option}>{tabsData[MainTabsId].title}</option>
          })}
        </select>
      </div>
      <div className={classes.mainTab}>
        <span className={classes.mainTab__title}>Main-Tab</span>
        <div className={classes.mainTab__inputDiv}>
            <input onChange={(event)=>{changeMainTabName(event, mainTabData._id)}} value={mainTabData.title} />
        </div>
      </div>
      <div className={classes.mainTab}>
        <span className={classes.mainTab__title}>Sub-Tabs</span>
        {mainTabData.subTab && mainTabData.subTab.map((tab, index) => {
          return (
            <div key={tab._id} className={classes.subTab__inputDiv}>
              <input onChange={(event)=>{changeSubTabName(event, tab._id)}} value={tab.title} />
              <button onClick={()=>{deleteSubTab(tab._id)}}><MdDelete /></button>
            </div>
          )
        })}
      </div>
      <div className={classes.btngroup}>
        <button className={classes.btngroup__delete}>Delete</button>
        <div className={classes.btngroup__action}>
            <button onClick={()=>{setInfoWidget(false)}} className={classes['btngroup__action--Cancel']}>Cancel</button>
            <button className={classes['btngroup__action--Save']}>Save</button>
        </div>
      </div>
    </Card>
  );
}

export default InfoWidget;
