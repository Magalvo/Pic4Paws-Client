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
import PetDetails from './pages/PetDetails/myPetDetails/PetDetails';

import Hero from './pages/hero';
import IsLogged from './components/isLogged';
import Adoption from './pages/Adoption/Adoption';

import NoPage from './pages/404';
import Messenger from './pages/Messenger/Messenger';
import PetDetailsApi from './pages/PetDetails/petDetailsApi/PetDetailsApi';
import PetDetailsV2 from './pages/PetDetails/myPetDetails/PetDetailsV2';
import CatBreedDetailsPage from './pages/CatBreeds/CatBreedDetailsPage';
import DogBreedDetailsPage from './pages/DogBreeds/DogBreedDetailsPage';
import TestMap from './components/TestMap';
import EditUser from './pages/EditUser';

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

            <Route path='/test' element={<TestMap />} />

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

            <Route
              path='/breeds/cat-breeds/:breedName'
              element={<CatBreedDetailsPage />}
            />
            <Route
              path='/breeds/dog-breeds/:breedName'
              element={<DogBreedDetailsPage />}
            />
            <Route path='/users/:id' element={<EditUser />} />

            <Route path='/pets' element={<Adoption />} />
            <Route path='/pets/:id' element={<PetDetailsV2 />} />
            {/*  <Route path='/petsAPI/:id' element */}
            <Route path='/animals/:id' element={<PetDetailsApi />} />
            <Route
              path='/profile/:userId'
              element={
                <IsPrivate>
                  <ProfilePage />
                </IsPrivate>
              }
            />

            <Route path='/messenger' element={<Messenger />} />
            <Route path='/*' element={<NoPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
