import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect } from 'react';
import { fetchAllNewsThunks } from './newsThunks.ts';
import { selectAllNews } from './newsSlice.ts';

const AllNews = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectAllNews);
  console.log(news);

  const fetchAllNews = useCallback(async () => {
    await dispatch(fetchAllNewsThunks());
  }, []);

  useEffect(() => {
    void fetchAllNews();
  }, [fetchAllNews, dispatch]);

  return <div></div>;
};

export default AllNews;
