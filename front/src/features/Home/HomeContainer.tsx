import { Button, Grid2, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AllNews from '../../components/AllNews/allNews.tsx';

const HomeContainer = () => {
  return (
    <div>
      <Grid2 container justifyContent="space-between" alignItems="center">
        <Grid2>
          <Typography variant="h6" component="h6">
            <strong>Posts</strong>
          </Typography>
        </Grid2>
        <Grid2>
          <NavLink to="/addNews">
            <Button variant="contained" color="primary">
              Add News
            </Button>
          </NavLink>
        </Grid2>
      </Grid2>
      <Grid2>
        <AllNews />
      </Grid2>
    </div>
  );
};

export default HomeContainer;
