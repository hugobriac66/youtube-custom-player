import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { listReducer } from './slices/listSlice';

export const store = configureStore({
  reducer: {
    list: listReducer
  }
});

setupListeners(store.dispatch);

export { queueVideoIDs, editVideoTitle, setVideoIsNew, removeVideo, clearVideos } from './slices/listSlice';
export * from './thunks/fetchVideoInfo';
