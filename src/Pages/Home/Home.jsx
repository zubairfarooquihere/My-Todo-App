import "./style.css";
import { useState } from "react";
import { initialTabs as tabs } from "./ingredients";
import { motion, AnimatePresence } from "framer-motion";

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  //console.log(tabs);
  return (
    <div className="window">
      <nav>
        <ul>
          {tabs.map((item) => (
            <li
              key={item.label}
              className={item === selectedTab ? "selected" : ""}
              onClick={() => setSelectedTab(item)}
            >
              {`${item.icon} ${item.label}`}
              {item === selectedTab ? (
                <motion.div className="underline" layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{display: 'flex'}}
          >
            {selectedTab.div.map((box) => {
              return (
                <div style={{ display: 'flex', fontSize: '20px', marginRight: '10px' }} key={box}>
                  <div key={'box '+box} style={{ backgroundColor: 'cyan', padding: '30px' }}>{box}</div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
