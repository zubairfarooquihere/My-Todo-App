import { configureStore } from "@reduxjs/toolkit";

import TabsSlice from "./Tabs-slice";
import TodoListSlice from "./TodoList-slice";
const store = configureStore({
  reducer: {
    TabsSlice: TabsSlice.reducer,
    TodoListSlice: TodoListSlice.reducer
  },
});

export default store;
