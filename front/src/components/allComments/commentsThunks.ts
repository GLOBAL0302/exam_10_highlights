import { createAsyncThunk } from '@reduxjs/toolkit';
import { IComments, ICommentsMutation } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchAllCommentsThunks = createAsyncThunk<IComments[], string>(
  'comments/fetchAllCommentsThunks',
  async (id) => {
    const { data } = await axiosApi.get(`/comments?news_id=${id}`);
    return data;
  },
);

export const postOneComment = createAsyncThunk<void, ICommentsMutation>(
  'comments/postOneComment',
  async (oneComment) => {
    await axiosApi.post(`/comments`, oneComment);
  },
);

export const deleteOneComment = createAsyncThunk<void, IComments>('comments/deleteOneComment', async (item) => {
  await axiosApi.delete(`/comments/${item.id}`);
});
