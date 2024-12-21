import './App.css';
import { Button, Container, Grid2, Typography } from '@mui/material';
import Header from './components/Header.tsx';
import { NavLink, Route, Routes } from 'react-router-dom';
import AddNews from './features/AddNews/AddNews.tsx';
import HomeContainer from './features/Home/HomeContainer.tsx';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/addNews" element={<AddNews />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
