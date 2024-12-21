import { useState } from 'react';
import { Button, Grid2, TextField } from '@mui/material';
import { ICommentWithOutId } from '../../types';

interface Props {
  onClickPost: (item: ICommentWithOutId) => void;
}

const initialState = {
  author: '',
  description: '',
};

const AddComments: React.FC<Props> = ({ onClickPost }) => {
  const [commentsForm, setCommentsForm] = useState(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommentsForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClickPost(commentsForm);
    setCommentsForm(initialState);
  };

  return (
    <Grid2
      container
      flexDirection="column"
      gap={2}
      style={{
        border: '1px solid silver',
        padding: '6px',
        borderRadius: '5px',
      }}
      onSubmit={onSubmit}
      component="form"
    >
      <TextField fullWidth onChange={onChange} id="author" name="author" label="Author" />
      <TextField fullWidth onChange={onChange} id="description" name="description" label="Text" />
      <Button variant="outlined" type="submit">
        add Comments
      </Button>
    </Grid2>
  );
};

export default AddComments;
