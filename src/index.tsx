import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {AnyAction} from "redux";
import rootReducer from "./store/index";
import { Provider } from "react-redux";
// import createSagaMiddleware from "redux-saga";
 import logger from "redux-logger";
import {ThunkDispatch} from "redux-thunk";
import App from "./App";
import {configureStore} from "@reduxjs/toolkit";

const  store= configureStore({
  reducer: rootReducer,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, unknown, AnyAction>;
 