import axios from 'axios';

const baseURL = `${import.meta.env.VITE_BASE_URL}/users`;

export const getId = async userId => {
  return axios.get(`${baseURL}/${userId}`);
};

export const getUserFriends = async userId => {
  return axios.get(`${baseURL}/${userId}/friends`);
};

export const patchingFriend = async (userId, friendId) => {
  return axios.patch(`${baseURL}/${userId}/${friendId}`);
};
