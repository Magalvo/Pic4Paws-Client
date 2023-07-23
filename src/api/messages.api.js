import axios from 'axios';

const baseURL = `${import.meta.env.VITE_BASE_URL}/messages`;

export const userMessages = async conversationId => {
  return axios.get(`${baseURL}/${conversationId}`);
};

export const sendMessage = async message => {
  return axios.post(`${baseURL}/`, {
    message
  });
};
