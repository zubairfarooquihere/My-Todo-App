import { createSlice } from "@reduxjs/toolkit";

let tabsData = {
  "#@123": {
    _id: "#@123",
    title: "Home",
    subTab: [
      { _id: "@345", title: "Home-1", todos: [] },
      { _id: "@215", title: "Home-2", todos: [] },
      { _id: "@652", title: "Home-3", todos: [] },
    ],
  },
  "#@452": {
    _id: "#@452",
    title: "Work",
    subTab: [
      { _id: "@987", title: "Work-1", todos: [] },
      { _id: "@789", title: "Work-2", todos: [] },
      { _id: "@369", title: "Work-3", todos: [] },
    ],
  },
  "#@952": { _id: "#@952", title: "Test", subTab: [] },
  MainTabs: ["#@123", "#@452", "#@952"],
};

const TabsSlice = createSlice({
  name: "Tabs",
  initialState: { tabsData: tabsData }, // Make sure 'item' is initialized as an empty array
  reducers: {
    renameMainTab(state, action) {
      const { mainTabId, newTitle } = action.payload;
      // Check if the mainTabId exists in the state
      if (state.tabsData[mainTabId]) {
        state.tabsData[mainTabId].title = newTitle;
      } else {
        console.error(`Main tab with ID ${mainTabId} does not exist.`);
      }
    },
    addSubTab(state, action) {
      let mainTabId = action.payload.mainTabId;
      // console.log("mainTabId:", mainTabId);
      const subTabId = "#" + Math.random().toString(36).substring(2, 9); // Generate a random alphanumeric string
      const title = "New Tab";
      if (state.tabsData[mainTabId]) {
        state.tabsData[mainTabId].subTab.push({
          _id: subTabId,
          title: title,
          todos: [],
        });
      } else {
        console.error(`Main tab with ID ${mainTabId} does not exist.`);
      }
    },
    renameSubTab(state, action) {
      const { mainTabId, subTabId, newTitle } = action.payload;
      // Check if the mainTabId exists in the state
      if (state.tabsData[mainTabId]) {
        // Create a new array for subTabs with the updated title for the specified subTabId
        const updatedSubTabs = state.tabsData[mainTabId].subTab.map((subTab) =>
          subTab._id === subTabId ? { ...subTab, title: newTitle } : subTab
        );

        // Return a new state object with the updated tabsData
        return {
          ...state,
          tabsData: {
            ...state.tabsData,
            [mainTabId]: {
              ...state.tabsData[mainTabId],
              subTab: updatedSubTabs,
            },
          },
        };
      } else {
        console.error(`Main tab with ID ${mainTabId} does not exist.`);
        return state; // Return the current state unchanged
      }
    },
    deleteSubTab(state, action) {
      let mainTabId = action.payload.mainTabId;
      let deleteSubTabId = action.payload.subTabId;
      if (state.tabsData[mainTabId]) {
        let subTabArray = JSON.parse(
          JSON.stringify(state.tabsData[mainTabId].subTab)
        );
        subTabArray = subTabArray.filter((item) => item._id !== deleteSubTabId);
        state.tabsData[mainTabId].subTab = subTabArray;
      } else {
        console.error(`Main tab with ID ${mainTabId} does not exist.`);
      }
    },
  },
});

export const TabsActions = TabsSlice.actions;
export default TabsSlice;