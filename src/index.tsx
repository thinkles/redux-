import './wdyr.js';
import 'react-hot-loader';
import {hot} from 'react-hot-loader/root';

import { Profiler, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AnyAction } from "redux";
import rootReducer from "./store/index";
import { Provider } from "react-redux";
// import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { ThunkDispatch } from "redux-thunk";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { middle as customMiddle } from "./middle";
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, customMiddle]),
  devTools: process.env.NODE_ENV !== "production",
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
const onRender =()=>console.log("Profiler 渲染函数")
const HotApp = hot(App);

root.render(
  <Provider store={store}>
    <StrictMode>
      <Profiler id="Sidebar" onRender={onRender}>
        <HotApp />
      </Profiler>
    </StrictMode>
  </Provider>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch &
  ThunkDispatch<RootState, unknown, AnyAction>;
