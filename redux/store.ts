import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import { newsSlice } from './newsSlice';
import { userSlice } from './userSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  news: newsSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
