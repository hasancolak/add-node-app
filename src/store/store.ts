import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import nodesReducer from "../store/nodes.slice";

export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
