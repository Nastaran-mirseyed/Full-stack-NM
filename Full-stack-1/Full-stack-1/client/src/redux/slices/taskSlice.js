import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: uuid(),
        ...action.payload,
      });
    },
    editTask: (state, action) => {
      const {
        id,
        title,
        date,
        description,
        directoryId,
        important,
        completed,
      } = action.payload;
      const todo = state.tasks.find((task) => task.id === id);
      if (todo) {
        todo.title = title;
        todo.date = date;
        todo.description = description;
        todo.directoryId = directoryId;
        todo.important = important;
        todo.completed = completed;
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleimportant: (state, action) => {
      const { id } = action.payload;
      const todo = state.tasks.find((task) => task.id === id);
      // console.log(todo);

      if (todo) {
        todo.important = !todo.important;
      }
    },
    togglecompleted: (state, action) => {
      const { id } = action.payload;
      const todo = state.tasks.find((task) => task.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export default taskSlice.reducer;
export const {
  addTask,
  editTask,
  removeTask,
  togglecompleted,
  toggleimportant,
} = taskSlice.actions;
