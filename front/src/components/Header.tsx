import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import { NavLink } from 'react-router-dom';
const Header = () => {
  return (
    <Box marginBottom={10}>
      <AppBar>
        <Toolbar>
          <IconButton></IconButton>
          <ArticleIcon />
          <Typography variant="h5" component="h5" sx={{ flexGrow: 1 }}>
            <NavLink to="/">News</NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
