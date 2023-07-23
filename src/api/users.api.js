import axios from 'axios';

export const baseURL = `${import.meta.env.VITE_BASE_URL}/users`;

const setAuthorizationHeaders = () => {
  axios.interceptors.request.use(config => {
    if (!config.url.startsWith(baseURL)) {
      return config;
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

export const findEmail = async userEmail => {
  return axios.get(`${baseURL}/`, {
    userEmail: userEmail
  });
};

export const getId = async userId => {
  return axios.get(`${baseURL}/${userId}`);
};

export const getUserFriends = async userId => {
  return axios.get(`${baseURL}/${userId}/friends`);
};

export const patchingFriend = async (userId, friendId) => {
  return axios.patch(`${baseURL}/${userId}/${friendId}`);
};
