import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const directorySlice = createSlice({
  name: "directories",
  initialState: {
    directory: [],
  },
  reducers: {
    addDirectory: (state, action) => {
      console.log("action test", action.payload);

      state.directory.push({
        id: uuid(),
        ...action.payload,
      });
    },
    editDirectory: (state, action) => {
      const { id, title } = action.payload;
      const dirs = state.directory.find((dir) => dir.id === id);
      if (dirs) {
        dirs.title = title;
      }
    },
    removeDirectory: (state, action) => {
      state.directory = state.directory.filter(
        (dir) => dir.id !== action.payload,
      );
    },
  },
});
export default directorySlice.reducer;
export const { addDirectory, editDirectory, removeDirectory } =
  directorySlice.actions;
