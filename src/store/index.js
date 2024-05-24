import { configureStore } from "@reduxjs/toolkit";

import TabsSlice from "./Tabs-slice";

const store = configureStore({
  reducer: {
    TabsSlice: TabsSlice.reducer,
  },
});

export default store;
