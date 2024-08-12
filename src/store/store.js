// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/services/api";
import authReducer from "@/features/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can also use sessionStorage
import { combineReducers } from "redux";
import { incomeApi } from "@/services/incomeApi";
// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
  [incomeApi.reducerPath]: incomeApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Ensure this key matches the key in combineReducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(api.middleware, incomeApi.middleware),
  devTools: process.env.NODE_ENV !== "production", // Ensure DevTools is enabled in development
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
