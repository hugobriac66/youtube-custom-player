import { createSlice } from '@reduxjs/toolkit';
import { fetchVideoInfo } from '../thunks/fetchVideoInfo';

const listSlice = createSlice({
  name: 'list',
  initialState: {
    pendingResponses: 0,
    pendingVideoIDs: [],
    videos: []
  },
  reducers: {
    // you can "mutate" the state directly with the toolkit
    queueVideoIDs: (state, action) => {
      state.pendingVideoIDs.push(...action.payload);
    },
    editVideoTitle: (state, action) => {
      const {id, title} = action.payload;
      const video = state.videos.find(video => video.id === id);
      if (video) {
        video.title = title;
      }
    },
    setVideoIsNew: (state, action) => {
      const {id, isNew} = action.payload;
      const video = state.videos.find(video => video.id === id);
      if (video) {
        video.isNew = isNew;
      }
    },
    removeVideo: (state, action) => {
      state.videos = state.videos.filter(video => video.id !== action.payload);
    },
    clearVideos: (state, action) => {
      state.videos = [];
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchVideoInfo.pending, (state, action) => {
      state.pendingResponses++;
    });
    builder.addCase(fetchVideoInfo.fulfilled, (state, action) => {
      state.pendingResponses--;
      state.pendingVideoIDs = state.pendingVideoIDs.filter(id => id !== action.payload.id);
      const { data, id, error } = action.payload;
      if (data && data.title) {
        const video = { id, title: data.title, thumbnailUrl: data.thumbnail_url, isNew: true }
        state.videos.push(video);
      }
    });
    builder.addCase(fetchVideoInfo.rejected, (state, action) => {
      state.pendingResponses--;
      state.pendingVideoIDs = state.pendingVideoIDs.filter(id => id !== action.payload.id);
    });
  }
});

export const { queueVideoIDs, editVideoTitle, setVideoIsNew, removeVideo, clearVideos } = listSlice.actions;
export const listReducer = listSlice.reducer;
