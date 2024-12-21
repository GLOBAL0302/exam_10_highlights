import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchAllCommentsThunks } from './commentsThunks.ts';
import { selectAllComments, selectIsFetchingCom } from './commentsSlice.ts';
import { CircularProgress, Grid2 } from '@mui/material';
import Comment from './Comment.tsx';

const Comments = () => {
  const dispatch = useAppDispatch();
  const selectComments = useAppSelector(selectAllComments);
  const selectIsFetchCom = useAppSelector(selectIsFetchingCom);

  console.log(selectComments);

  const fetchAllComments = async () => {
    await dispatch(fetchAllCommentsThunks());
  };

  useEffect(() => {
    void fetchAllComments();
  }, []);

  return (
    <>
      {selectIsFetchCom ? (
        <CircularProgress />
      ) : (
        <Grid2
          style={{
            border: '1px dashed black',
            padding: '5px',
            height: '200px',
            overflow: 'scroll',
          }}
        >
          {selectComments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </Grid2>
      )}
    </>
  );
};

export default Comments;
