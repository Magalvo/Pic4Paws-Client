import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import ProfilePage from './pages/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import IsPrivate from './components/isPrivate';
import PetDetailsCh from './pages/PetDetails/PetDetailsCh';

import Hero from './pages/hero';
import IsLogged from './components/isLogged';
import Adoption from './pages/Adoption/Adoption';
import { PetDetails } from './pages/PetDetails/PetDetails';
import CatSelection from './pages/CatBreeds/CatSelection';

function App() {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector(state => state.authToken));

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Hero />} />

            <Route
              path='/auth'
              element={
                <IsLogged>
                  <LoginPage />
                </IsLogged>
              }
            />

            <Route
              path='/home'
              element={
                <IsPrivate>
                  <HomePage />{' '}
                </IsPrivate>
              }
            />

            <Route path='/pets' element={<Adoption />} />

            <Route path='/pets/:id' element={<PetDetailsCh />} />

            <Route
              path='/profile/:userId'
              element={
                <IsPrivate>
                  <ProfilePage />
                </IsPrivate>
              }
            />

            <Route path='/cats' element={<CatSelection />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
