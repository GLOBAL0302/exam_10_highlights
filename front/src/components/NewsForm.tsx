import { useState } from 'react';
import { useAppDispatch } from '../app/hooks.ts';
import { Button, Grid2, TextField } from '@mui/material';
import ImageInput from './mui/imageInput/ImageInput.tsx';
import { postOneNews } from './AllNews/newsThunks.ts';

const initialState = {
  title: '',
  description: '',
  image: null,
};

const NewsForm = () => {
  const dispatch = useAppDispatch();
  const [newsForm, setNewsForm] = useState(initialState);

  const onChangeNewsForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewsForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setNewsForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(postOneNews(newsForm));
  };
  return (
    <>
      <Grid2 container gap={2} flexDirection="column" component="form" onSubmit={onSubmit}>
        <TextField
          label="Title"
          onChange={onChangeNewsForm}
          id="title"
          name="title"
          variant="outlined"
          color="primary"
          fullWidth
        />
        <TextField
          label="Description"
          onChange={onChangeNewsForm}
          id="description"
          name="description"
          variant="outlined"
          color="primary"
          fullWidth
        />
        <ImageInput name="image" label="image" onGetFile={onChangeFile} />
        <Button type="submit" variant="contained" color="primary">
          Add News
        </Button>
      </Grid2>
    </>
  );
};

export default NewsForm;
