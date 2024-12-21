import './App.css';
import { Container } from '@mui/material';
import Header from './components/Header.tsx';
import { Route, Routes } from 'react-router-dom';
import AddNews from './features/AddNews/AddNews.tsx';
import HomeContainer from './features/Home/HomeContainer.tsx';
import OneNewsContainer from './features/OneNewsContainer/OneNewsContainer.tsx';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/addNews" element={<AddNews />} />
          <Route path="/newsContainer/:id" element={<OneNewsContainer />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
