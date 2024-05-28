import React,{ useEffect, useState } from "react";
import classes from "./InfoWidget.module.scss";

import { useDispatch } from 'react-redux';
import { TabsActions } from '../../../../store/Tabs-slice';

import Card from "../../../UI/Card/Card";
import { MdDelete } from "react-icons/md";

import ConfirmBox from "../../../UI/ConfirmBox/ConfirmBox";
import { FaCirclePlus } from "react-icons/fa6";

function InfoWidget(props) {
  const dispatch = useDispatch();
  const { tabsData, mainTabSelectedData, setInfoWidget, setMainTabSelected } = props;
  const [mainTabData, setMainTabData] = useState(mainTabSelectedData);
  const [confirmbox, setConfirmbox] = useState({title: '', message: '', okFunc: ()=>{}, cancelFunc: ()=>{}, openBox: false});

  useEffect(()=>{
    if(mainTabData && tabsData[mainTabData._id]){
      setMainTabData(tabsData[mainTabData._id]);
    }else{
      setMainTabData(tabsData.MainTabs.length > 0 ? tabsData[tabsData.MainTabs[0]] : null);
    }
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

  const deleteMainTab = () => {
    let check = mainTabData._id;
    if(mainTabData._id === mainTabSelectedData._id) {
      //setMainTabSelected(null);
      check = null;
    }
    showConfirmBox({title: 'Delete Main Tab?', message: 'Are you sure you want to delete this tab?', dispatchFunc: ()=>{setMainTabSelected(null);  dispatch(TabsActions.deleteMainTab({mainTabId: mainTabData._id}));}})
    //dispatch(TabsActions.deleteMainTab({mainTabId: mainTabData._id}));
  }

  const deleteSubTab = (subTabId) => {
    showConfirmBox({title: 'Delete Sub Tab?', message: 'Are you sure you want to delete this tab?', dispatchFunc: ()=>{dispatch(TabsActions.deleteSubTab({mainTabId: mainTabData._id, subTabId: subTabId}));}})
  }

  const showConfirmBox = ({title, message, dispatchFunc}) => {
    setConfirmbox((prev) => ({
      ...prev,
      title: title,
      message: message,
      okFunc: () => {
        dispatchFunc()
      },
      cancelFunc: () => (
        setConfirmbox({
          ...prev,
          openBox: false
        })
      ),
      openBox: true
    }));
  }

  if(!mainTabData) {
    //No Main Tab
    //Not Handled Condition
    console.log('No Main Tab');
  }

  const addsubtab = () => {
    dispatch(TabsActions.addSubTab({mainTabId: mainTabData._id}));
  }

  return (
    <>
      {confirmbox.openBox && <ConfirmBox zIndex={109} title={confirmbox.title} message={confirmbox.message} okFunc={confirmbox.okFunc} cancelFunc={confirmbox.cancelFunc} />}
      <Card onClose={()=>{setInfoWidget(false)}} className={classes.infoWidget}>
        <div className={classes.infoWidget__dropdown}>
          {<select defaultValue={mainTabData._id} className={classes.infoWidget__dropdown_select}>
            {tabsData.MainTabs && tabsData.MainTabs.map((MainTabsId)=>{
              return <option onClick={onChangeMainTabDetail} key={MainTabsId} value={MainTabsId} className={classes.infoWidget__dropdown_option}>{tabsData[MainTabsId].title}</option>
            })}
          </select>}
        </div>
        <div className={classes.mainTab}>
          <span className={classes.mainTab__title}>Main-Tab</span>
          <div className={classes.mainTab__inputDiv}>
              <input onChange={(event)=>{changeMainTabName(event, mainTabData._id)}} value={mainTabData.title} />
          </div>
        </div>
        <div className={classes.mainTab}>
          <div className={classes.mainTab__title}>Sub-Tabs <span onClick={addsubtab} className={`${classes['mainTab__option']}`}><FaCirclePlus /></span></div>
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
          <button onClick={deleteMainTab} className={classes.btngroup__delete}>Delete</button>
          <div className={classes.btngroup__action}>
              <button onClick={()=>{setInfoWidget(false)}} className={classes['btngroup__action--Cancel']}>Cancel</button>
              <button className={classes['btngroup__action--Save']}>Save</button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default InfoWidget;
