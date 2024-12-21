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
import AddComments from '../../components/allComments/AddComments.tsx';
import { ICommentWithOutId } from '../../types';
import { fetchAllCommentsThunks, postOneComment } from '../../components/allComments/commentsThunks.ts';

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

  const onClickPost = async (item: ICommentWithOutId) => {
    if (id) {
      const newComment = {
        news_id: id,
        ...item,
      };
      await dispatch(postOneComment(newComment));
      await dispatch(fetchAllCommentsThunks(id));
    }
  };

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
                  <Typography textAlign="center" variant="h4" component="h4">
                    {oneNews.title}
                  </Typography>
                </Grid2>
                <Grid2>
                  <CardMedia
                    component="img"
                    image={newsPic}
                    style={{ width: '200px', height: '200px' }}
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
                  <Typography variant="subtitle1" component="p" gutterBottom>
                    {oneNews.description}
                  </Typography>
                </Grid2>
                <hr />
                {id && <Comments id={id}/>}
                <AddComments onClickPost={onClickPost} />
              </Grid2>
            </>
          )}
        </>
      )}
    </>
  );
};

export default OneNewsContainer;
