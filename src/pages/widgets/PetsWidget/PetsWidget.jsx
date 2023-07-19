import { useState, useEffect } from 'react';

import { getPets } from '../../../api/pets.api';
import axios from 'axios';
import PetWidget from '../petWidget/PetWidget';
import { Grid } from '@mui/material';
import useStyles from './styles';

const PetsWidget = () => {
  const [pets, setPets] = useState([]);
  const [randomPet, setRandomPet] = useState([]);
  const [bearerToken, setBearerToken] = useState('');
  const classes = useStyles();

  //________________________________ PET FINDER API PETS_______________________________//
  const fetchBearerToken = async () => {
    const storedToken = localStorage.getItem('bearerToken');
    const storedTokenExp = localStorage.getItem('bearerTokenExp');

    if (storedToken && storedTokenExp && Number(storedTokenExp) > Date.now()) {
      setBearerToken(storedToken);
      return;
    }

    try {
      const response = await axios.post(
        'https://api.petfinder.com/v2/oauth2/token',
        'grant_type=client_credentials&client_id=cfPM5m5BGWaI1rdwkyiChizENcXVFaxcNVLuvUJm3vbLPIW7tm&client_secret=J0kHg81Fn8sq02RUNeLF39REeSDSsbGU7ruqFACX',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const { access_token, expires_in } = response.data;
      const expiration = Date.now() + expires_in * 1000; // Calculate expiration timestamp

      localStorage.setItem('bearerToken', access_token);
      localStorage.setItem('bearerTokenExp', expiration.toString());

      setBearerToken(access_token);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPets = async bearerToken => {
    try {
      const response = await axios.get('https://api.petfinder.com/v2/animals', {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      });
      const { animals } = response.data;
      setRandomPet(animals);

      // Fetch data for each individual animal
      const promises = animals.map(animal => {
        return axios.get(`https://api.petfinder.com/v2/animals/${animal.id}`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        });
      });

      const animalData = await Promise.all(promises);
      const updatedRandomPet = animals.map((animal, index) => {
        return {
          ...animal,
          data: animalData[index].data // Add the fetched data to each animal
        };
      });

      setRandomPet(updatedRandomPet); // Update randomPet with the fetched data for each animal
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBearerToken();
  }, []);

  useEffect(() => {
    if (bearerToken) {
      fetchPets(bearerToken)
        .then(data => {
          console.log(data);
          setRandomPet(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [bearerToken]);

  useEffect(() => {
    const storedTokenExp = localStorage.getItem('bearerTokenExp');

    if (storedTokenExp && Number(storedTokenExp) < Date.now()) {
      localStorage.removeItem('bearerToken');
      localStorage.removeItem('bearerTokenExp');
      setBearerToken('');
    }
  }, []);

  //________________________________ MY API PETS_______________________________________//
  const fetchMyPets = async () => {
    try {
      const response = await getPets();

      setPets(response.data);
    } catch (e) {
      console.log('Error fetching the projects', e);
    }
  };

  useEffect(() => {
    fetchMyPets();
  }, []);

  return (
    <div>
      <h1>Pets</h1>
      <Grid
        className={classes.container}
        container
        alignItems='stretch'
        spacing={3}
      >
        {pets.map(pet => (
          <Grid item key={pet._id} xs={12} sm={6} md={6}>
            <PetWidget pet={pet} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PetsWidget;
