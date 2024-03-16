import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import { configureStore, } from "@reduxjs/toolkit";
import userReducer from "../state/userState";
import sessionReducer from "../state/sessionState";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userReducer: userReducer,
    sessionReducer: sessionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
