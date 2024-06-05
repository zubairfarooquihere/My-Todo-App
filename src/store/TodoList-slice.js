import { createSlice } from "@reduxjs/toolkit";

let todoList = {
  "#@123Todo": {
    _id: "#@123Todo",
    title: "Todo 1",
    mainTab: '#@123',
    subTab: '@345',
    tasks: {
      "@123Todo": { _id: "@123Todo", title: "Home-1 Todo", status: 'active' },
      "@124Todo": { _id: "@124Todo", title: "Home-2 Todo", status: 'active' }
    },
    allTaskIds: ["@123Todo", "@124Todo"],
  },
  "#@129Todo": {
    _id: "#@116Todo",
    title: "Todo 1.2",
    mainTab: '#@123',
    subTab: '@345',
    tasks: {
      "@122Todo": { _id: "@122Todo", title: "Home-2 Todo", status: 'active' },
    },
    allTaskIds: ["@122Todo"],
  },
  "#@457Todo": {
    _id: "#@457Todo",
    title: "Todo 2",
    mainTab: '#@123',
    subTab: '@215',
    tasks: {
      "@457Todo" : { _id: "@457Todo", title: "ABC-1 Todo", status: 'active' },
    },
    allTaskIds: ["@457Todo"],
  },
  allTodos: ["#@123Todo", "#@129Todo", "#@457Todo"],
};

const TodoListSlice = createSlice({
  name: "TodoList",
  initialState: { todoList: todoList }, // Make sure 'item' is initialized as an empty array
  reducers: {
    addMainTab(state, action) {
      let { title } = action.payload;
    },
  },
});

export const TodoListSliceActions = TodoListSlice.actions;
export default TodoListSlice;
