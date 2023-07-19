import axios from 'axios';

const baseURL = `http://localhost:3001/pets`;

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
