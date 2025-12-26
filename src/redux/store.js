import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/taskSlice.js";
import directorySlice from "./slices/directorySlice.js";

export const store = configureStore({
  reducer: {
    task: taskSlice,
    directories: directorySlice,
  },
});
