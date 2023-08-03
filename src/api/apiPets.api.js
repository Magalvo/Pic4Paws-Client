import axios from 'axios';

const petURL = `${import.meta.env.VITE_PET_URL}`;

export const authenticate = async () => {
  return axios.post(
    `${petURL}/oauth2/token`,
    `grant_type=client_credentials&client_id=${
      import.meta.env.VITE_PET_ID
    }&client_secret=${import.meta.env.VITE_PET_SECRET}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
};

export const getApiPets = async bearerToken => {
  return (
    axios.get(`${petURL}/animals`),
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    }
  );
};

export const getApiPet = async (animalId, bearerToken) => {
  return axios.get(`${petURL}/animals/${animalId}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });
};
