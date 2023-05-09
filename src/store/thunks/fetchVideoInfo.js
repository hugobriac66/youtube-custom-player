import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchVideoInfo = createAsyncThunk('chat/fetch', async (id) => {
  return axios.get(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`)
    .then(response => {
      return { data: response.data, id };
    })
    .catch(error => {
      if (error.response.data.error) {
        return { error: error.response.data.error, id };
      } else {
        return { error, id };
      }
    });
});

export { fetchVideoInfo };
