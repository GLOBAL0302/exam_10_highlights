import { INews } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAllNewsThunks, postOneNews } from './newsThunks.ts';

interface INewsSlice {
  news: INews[];
  isFetching: boolean;
  isPosting: boolean;
}

const initialState: INewsSlice = {
  news: [],
  isFetching: false,
  isPosting: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNewsThunks.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchAllNewsThunks.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.news = payload;
      })
      .addCase(fetchAllNewsThunks.rejected, (state) => {
        state.isFetching = false;
      });

    builder
      .addCase(postOneNews.pending, (state) => {
        state.isPosting = true;
      })
      .addCase(postOneNews.fulfilled, (state) => {
        state.isPosting = false;
      })
      .addCase(postOneNews.rejected, (state) => {
        state.isPosting = false;
      });
  },
  selectors: {
    selectAllNews: (state) => state.news,
    selectIsFetching: (state) => state.isFetching,
    selectIsPosting: (state) => state.isPosting,
  },
});

export const newsReducer = newsSlice.reducer;
export const { selectAllNews, selectIsPosting, selectIsFetching } = newsSlice.selectors;
