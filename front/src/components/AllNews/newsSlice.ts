import { INews } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { deleteOneNews, fetchAllNewsThunks, postOneNews } from './newsThunks.ts';

interface INewsSlice {
  news: INews[];
  oneNews: INews | null;
  isFetching: boolean;
  isPosting: boolean;
  isDeleting: boolean;
}

const initialState: INewsSlice = {
  news: [],
  oneNews: null,
  isFetching: false,
  isPosting: false,
  isDeleting: false,
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

    builder
      .addCase(deleteOneNews.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteOneNews.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteOneNews.rejected, (state) => {
        state.isDeleting = false;
      });
  },
  selectors: {
    selectAllNews: (state) => state.news,
    selectIsFetching: (state) => state.isFetching,
    selectIsPosting: (state) => state.isPosting,
    selectIsDeleting: (state) => state.isDeleting,
  },
});

export const newsReducer = newsSlice.reducer;
export const { selectAllNews, selectIsPosting, selectIsFetching, selectIsDeleting } = newsSlice.selectors;
