import axios from 'axios';

const baseURL = `${import.meta.env.VITE_BASE_URL}/auth`;

export const signup = async user => {
  return axios.post(`${baseURL}/register`, user);
};

export const signin = async user => {
  return axios.post(`${baseURL}/login`, user);
};

// Add this
export const signupGoogle = user => {
  console.log('USER: ', user);
  return axios.post(`${baseURL}/signup-google`, user);
};

export const upload = uploadData => {
  return axios.post(`${baseURL}/upload`, uploadData);
};
