import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect } from 'react';
import { fetchAllNewsThunks } from './newsThunks.ts';
import { selectAllNews, selectIsFetching } from './newsSlice.ts';
import OneNews from './OneNews.tsx';
import { CircularProgress, Grid2 } from '@mui/material';

const AllNews = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectAllNews);
  const isFetching = useAppSelector(selectIsFetching);
  console.log(news);

  const fetchAllNews = useCallback(async () => {
    await dispatch(fetchAllNewsThunks());
  }, []);

  useEffect(() => {
    void fetchAllNews();
  }, [fetchAllNews, dispatch]);

  return (
    <Grid2 container flexDirection="column" gap={3}>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          {news.map((oneNews) => (
            <OneNews key={oneNews.id} oneNews={oneNews} />
          ))}
        </>
      )}
    </Grid2>
  );
};

export default AllNews;
