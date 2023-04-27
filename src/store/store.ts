import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { useSelector as useSelectorBase } from 'react-redux';
import auth from './slices/auth';

export const store = configureStore({
  reducer: {
    auth,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);

declare global {
  type RootState = ReturnType<typeof store.getState>;
}
declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}
