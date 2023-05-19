import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./store/index";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";
import mySaga from "./sagas/index";
import App from "./App";

/**
 * * 接入 saga、redux、react-redux 、 redux-devtools
 */
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(mySaga);

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
