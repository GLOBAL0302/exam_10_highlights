import { INews } from '../../types';
import { Button, CardMedia, Grid2, Typography } from '@mui/material';
import noPic from '../../assets/noPic.jpeg';
import { apiUrl } from '../../Constants.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { useAppDispatch } from '../../app/hooks.ts';
import { deleteOneNews, fetchAllNewsThunks } from './newsThunks.ts';

interface Props {
  oneNews: INews;
}

const OneNews: React.FC<Props> = ({ oneNews }) => {
  const dispatch = useAppDispatch();

  const onClickDelete = async () => {
    await dispatch(deleteOneNews(oneNews));
    await dispatch(fetchAllNewsThunks());
  };

  let newsPic = noPic;
  if (oneNews.image) {
    newsPic = apiUrl + '/' + oneNews.image;
  }
  return (
    <Grid2
      style={{
        border: '1px solid silver',
        padding: '10px',
      }}
      container
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid2 marginRight={10}>
        <CardMedia
          component="img"
          image={newsPic}
          style={{ width: '100px', height: '100px', marginLeft: 'auto' }}
          title={oneNews.title}
        />
      </Grid2>
      <Grid2 width="30%">
        <Typography variant="h5" component="p">
          {oneNews.description}
        </Typography>
        <Typography variant="body2" component="p">
          {dayjs(oneNews.created_at).format('YYYY-MM-DD HH:mm:ss')}
        </Typography>
        <NavLink to={`/newsContainer/${oneNews.id}`}>
          <Button variant="contained" color="warning" startIcon={<ImportContactsIcon />}>
            read more
          </Button>
        </NavLink>
      </Grid2>
      <Grid2 width="20%">
        <Button onClick={onClickDelete} variant="outlined" type="button" color="error" startIcon={<DeleteIcon />} />
      </Grid2>
    </Grid2>
  );
};

export default OneNews;
