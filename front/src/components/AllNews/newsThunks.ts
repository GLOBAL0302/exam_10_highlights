import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { INews, INewsMutation } from '../../types';

export const fetchAllNewsThunks = createAsyncThunk<INews[], void>('news/fetchAllNewsThunks', async () => {
  const { data } = await axiosApi.get('/news');
  return data;
});

export const postOneNews = createAsyncThunk<void, INewsMutation>('news/postOneNews', async (oneNews) => {
  const formData = new FormData();
  const keys = Object.keys(oneNews) as (keyof INewsMutation)[];
  keys.forEach((key) => {
    const value = oneNews[key];
    if (value !== null) {
      formData.append(key, value);
    }
  });
  console.log(formData);

  await axiosApi.post('/news', formData);
});
