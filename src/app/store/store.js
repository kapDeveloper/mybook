// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import counter from "./features/counter";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "./features/localStorageUtils";

const store = configureStore({
  reducer: {
    items: counter,
  },
});

export default store;
