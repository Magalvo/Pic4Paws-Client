import axios from 'axios';

const baseURL = `${import.meta.env.VITE_BASE_URL}/pets`;

const setAuthorizationHeaders = () => {
  axios.interceptors.request.use(config => {
    if (!config.url.startsWith(baseURL)) {
      return config;
    } else if (config.url.startsWith(`${import.meta.env.VITE_PET_URL}`)) {
      const bearer = localStorage.getItem('bearerToken');

      if (bearer) {
        config.headers = { Authorization: `Bearer ${bearer}` };
      }
    }
    //retrieve the JWT from the local storage
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      config.headers = { Authorization: `Bearer ${storedToken}` };
    }
    return config;
  });
};

setAuthorizationHeaders();

export const getPets = async () => {
  return axios.get(`${baseURL}/`);
};

export const getPet = async id => {
  return axios.get(`${baseURL}/${id}`);
};

export const createPet = async newPet => {
  return axios.post(`${baseURL}/`, newPet);
};

export const removePet = async id => {
  return axios.delete(`${baseURL}/${id}`);
};

export const editPet = async updatedPet => {
  return axios.put(`${baseURL}/${updatedPet._id}`, updatedPet);
};

export const upload = async uploadData => {
  return axios.post(`${baseURL}/upload`, uploadData);
};
