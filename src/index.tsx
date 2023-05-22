import { Dispatch, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AnyAction, applyMiddleware, createStore } from "redux";
import rootReducer from "./store/index";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createLogger } from "redux-logger";
import thunk, {ThunkDispatch} from "redux-thunk";
import mySaga from "./sagas/index";
import App from "./App";

/**
 * * 接入 saga、redux、react-redux 、 redux-devtools
 */
// const sagaMiddleware = createSagaMiddleware();sagaMiddleware
const logger = createLogger({});
 
const middleware:any[] = [thunk];

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

// sagaMiddleware.run(mySaga);

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
export type AppGetState = typeof store.getState
// export type AppDispatch = Dispatch<AnyAction>;
