import React from "react";
import classes from "./InfoWidget.module.scss";

import Card from "../../../UI/Card/Card";
function InfoWidget() {
  return (
    <Card className={classes.infoWidget}>
      <div className={classes.infoWidget__dropdown}>
        <select className={classes.infoWidget__dropdown_select}>
          <option value={'Hello'} className={classes.infoWidget__dropdown_option} style={{backgroundColor: 'red'}}>Hello</option>
        </select>
      </div>
      <div className={classes.mainTab}>
        <span className={classes.mainTab__title}>Main-Tab</span>
        <div className={classes.mainTab__inputDiv}>
            <input value={'Home'} />
        </div>
      </div>
      <div className={classes.mainTab}>
        <span className={classes.mainTab__title}>Sub-Tabs</span>
        <div className={classes.subTab__inputDiv}>
            <input value={'Home-1'} />
            <button>X</button>
        </div>
        <div className={classes.subTab__inputDiv}>
            <input value={'Home-1'} />
            <button>X</button>
        </div>
      </div>
      <div className={classes.btngroup}>
        <button className={classes.btngroup__delete}>Delete</button>
        <div className={classes.btngroup__action}>
            <button className={classes['btngroup__action--Cancel']}>Cancel</button>
            <button className={classes['btngroup__action--Save']}>Save</button>
        </div>
      </div>
    </Card>
  );
}

export default InfoWidget;
