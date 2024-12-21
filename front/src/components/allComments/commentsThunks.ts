import { createAsyncThunk } from '@reduxjs/toolkit';
import { IComments, ICommentsMutation } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchAllCommentsThunks = createAsyncThunk<IComments[], void>(
  'comments/fetchAllCommentsThunks',
  async () => {
    const { data } = await axiosApi.get('/comments');
    return data;
  },
);

export const postOneComment = createAsyncThunk<void, ICommentsMutation>(
  'comments/postOneComment',
  async (oneComment) => {
    await axiosApi.post(`/comments/`, oneComment);
  },
);

export const deleteOneComment = createAsyncThunk<void, IComments>('comments/deleteOneComment', async (item) => {
  await axiosApi.delete(`/comments/${item.id}`);
});
