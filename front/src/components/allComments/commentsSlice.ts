import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCommentsThunks } from './commentsThunks.ts';
import { IComments } from '../../types';

interface ICommentsSlice {
  comments: IComments[];
  isFetchingComments: boolean;
  isDeletingComments: boolean;
}

const initialState: ICommentsSlice = {
  comments: [],
  isFetchingComments: false,
  isDeletingComments: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCommentsThunks.pending, (state) => {
        state.isFetchingComments = true;
      })
      .addCase(fetchAllCommentsThunks.fulfilled, (state, { payload }) => {
        state.isFetchingComments = false;
        state.comments = payload;
      })
      .addCase(fetchAllCommentsThunks.rejected, (state) => {
        state.isFetchingComments = false;
      });
  },
  selectors: {
    selectAllComments: (state) => state.comments,
    selectIsFetchingCom: (state) => state.isFetchingComments,
    selectIsDeletingCom: (state) => state.isDeletingComments,
  },
});

export const commentsReducer = commentsSlice.reducer;
export const {} = commentsSlice.reducer;
export const { selectAllComments, selectIsFetchingCom, selectIsDeletingCom } = commentsSlice.selectors;
