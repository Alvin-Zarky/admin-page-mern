import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import categorySlice from '../features/category/categorySlice';
import contentSlice from '../features/content/contentSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    content: contentSlice
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
