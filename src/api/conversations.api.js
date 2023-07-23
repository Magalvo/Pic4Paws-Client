import axios from 'axios';

const baseURL = `${import.meta.env.VITE_BASE_URL}/conversations`;

export const userConversations = async userId => {
  return axios.get(`${baseURL}/${userId}`);
};

export const onlineConversations = async (currentId, userId) => {
  return axios.get(`${baseURL}/find/${currentId}/${userId}`);
};
