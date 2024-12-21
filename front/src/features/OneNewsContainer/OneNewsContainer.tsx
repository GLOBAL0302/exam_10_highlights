import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchOneNewsThunk } from '../../components/AllNews/newsThunks.ts';
import { selectIsFetching, selectOneNews } from '../../components/AllNews/newsSlice.ts';
import { CardMedia, CircularProgress, Grid2, Typography } from '@mui/material';
import noPic from '../../assets/noPic.jpeg';
import { apiUrl } from '../../Constants.ts';
import dayjs from 'dayjs';
import Comments from '../../components/allComments/Comments.tsx';

const OneNewsContainer = () => {
  const dispatch = useAppDispatch();
  const oneNews = useAppSelector(selectOneNews);
  const isFetching = useAppSelector(selectIsFetching);
  const { id } = useParams();

  const fetchOneNews = async () => {
    if (id) {
      await dispatch(fetchOneNewsThunk(id));
    }
  };

  let newsPic = noPic;
  if (oneNews && oneNews.image) {
    newsPic = apiUrl + '/' + oneNews.image;
  }

  useEffect(() => {
    void fetchOneNews();
  }, [id]);
  return (
    <>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          {oneNews && (
            <>
              <Grid2 flexDirection="column">
                <Grid2>
                  <Typography textAlign="center" variant="h2" component="h2">
                    {oneNews.title}
                  </Typography>
                </Grid2>
                <Grid2>
                  <CardMedia
                    component="img"
                    image={newsPic}
                    style={{ width: '300px', height: '300px' }}
                    title={oneNews.title}
                  />
                </Grid2>
                <Grid2>
                  <Typography variant="caption" color="silver" component="p">
                    {dayjs(oneNews.created_at).format('YYYY-MM-DD HH:mm:ss')}
                  </Typography>
                </Grid2>
                <hr />
                <Grid2>
                  <Typography variant="h5" gutterBottom>
                    {oneNews.description}
                  </Typography>
                </Grid2>
                <hr />
                <Comments />
              </Grid2>
            </>
          )}
        </>
      )}
    </>
  );
};

export default OneNewsContainer;
