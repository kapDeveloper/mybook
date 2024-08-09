// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/services/api";
import authReducer from "@/features/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can also use sessionStorage
import { combineReducers } from "redux";

// Combine your reducers
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only auth will be persisted, you can add more reducers here if needed
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
    }).concat(api.middleware),
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
