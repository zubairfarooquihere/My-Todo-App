import { createSlice } from "@reduxjs/toolkit";

//Idle format
// let todoList = {
//   todos: {},
//   tasks: {},
//   todosIds: [],
//   tasksIds: []
// }
let todoList = {
  "#@123Todo": {
    _id: "#@123Todo",
    title: "Todo 1",
    mainTab: "#@123",
    subTab: "@345",
    tasks: {
      "@123Todo": { _id: "@123Todo", title: "Home-1 Todo", status: "active" },
      "@124Todo": { _id: "@124Todo", title: "Home-2 Todo", status: "active" },
    },
    allTaskIds: ["@123Todo", "@124Todo"],
  },
  "#@129Todo": {
    _id: "#@129Todo",
    title: "Todo 1.2",
    mainTab: "#@123",
    subTab: "@345",
    tasks: {
      "@122Todo": { _id: "@122Todo", title: "Home-2 Todo", status: "active" },
    },
    allTaskIds: ["@122Todo"],
  },
  "#@457Todo": {
    _id: "#@457Todo",
    title: "Todo 2",
    mainTab: "#@123",
    subTab: "@215",
    tasks: {
      "@457Todo": { _id: "@457Todo", title: "ABC-1 Todo", status: "active" },
    },
    allTaskIds: ["@457Todo"],
  },
  allTodos: ["#@123Todo", "#@129Todo", "#@457Todo"],
};

const TodoListSlice = createSlice({
  name: "TodoList",
  initialState: { todoList: todoList }, // Make sure 'item' is initialized as an empty array
  reducers: {
    addNewTodo(state, action) {
      const { newTodo } = action.payload;
      state.todoList[newTodo._id] = newTodo;
      state.todoList.allTodos.push(newTodo._id)
      // console.log(JSON.parse(JSON.stringify(state.todoList)));
    },
    todoListTitleChange(state, action) {
      const { todoListId, title } = action.payload;
      if (state.todoList[todoListId].title !== title) {
        state.todoList[todoListId].title = title;
      }
    },
    taskStatusUpdate(state, action) {
      const { todoListId, taskId, newAllTaskIds, status } = action.payload;
      state.todoList[todoListId].tasks[taskId].status = status;
      state.todoList[todoListId].allTaskIds = newAllTaskIds;
    },
    taskTitleUpdate(state, action) {
      const { todoListId, taskId, newTitle } = action.payload;
      state.todoList[todoListId].tasks[taskId].title = newTitle;
    },
    addTask(state, action) {
      const { todoId, taskObj, taskListIds } = action.payload;
      state.todoList[todoId].allTaskIds = taskListIds;
      state.todoList[todoId].tasks[taskObj._id] = taskObj;
    },
    deleteTask(state, action) {
      const { todoId, taskId, taskListIds } = action.payload;
      state.todoList[todoId].allTaskIds = taskListIds;
      const { [taskId]: removedTask, ...remainingTasks } =
        state.todoList[todoId].tasks;
      state.todoList[todoId].tasks = remainingTasks;
    },
    sortTaskList(state, action) {
      const { todoId, taskListIds } = action.payload;
      state.todoList[todoId].allTaskIds = taskListIds;
    },
    deleteTodo(state, action) {
      const { todoId } = action.payload;
      // Check if the todoId exists in the todoList
      const todo = state.todoList[todoId];
      if (todo) {
        // Remove the todoId from the allTodos array
        state.todoList.allTodos = state.todoList.allTodos.filter((id) => id !== todoId);
        // Delete the todo from the todoList
        delete state.todoList[todoId];
      }
    },
  },
});

export const TodoListSliceActions = TodoListSlice.actions;
export default TodoListSlice;
