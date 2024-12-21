import { IComments } from '../../types';
import { Button, Grid2, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../app/hooks.ts';
import { deleteOneComment, fetchAllCommentsThunks } from './commentsThunks.ts';

interface Props {
  comment: IComments;
}

const Comment: React.FC<Props> = ({ comment }) => {
  const dispatch = useAppDispatch();

  const onClickDelete = async () => {
    await dispatch(deleteOneComment(comment));
    await dispatch(fetchAllCommentsThunks());
  };

  return (
    <Grid2
      container
      justifyContent="space-between"
      marginBottom="2px"
      style={{
        border: '1px solid silver',
        padding: '5px',
      }}
    >
      <Grid2>
        <Typography variant="body2">
          <strong>Author:</strong> {comment.author}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {comment.description}
        </Typography>
      </Grid2>
      <Button onClick={onClickDelete} type="button" variant="contained" color="error" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </Grid2>
  );
};
export default Comment;
