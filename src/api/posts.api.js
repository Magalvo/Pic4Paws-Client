import axios from 'axios';

export const baseURL = `${import.meta.env.VITE_BASE_URL}/posts`;

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

export const getAll = () => {
  return axios.get(`${baseURL}/`);
};

export const userPosts = userId => {
  return axios.post(`${baseURL}/${userId}/posts`);
};

export const liking = (postId, loggedInUser) => {
  return (
    axios.patch(`${baseURL}/${postId}/like`),
    {
      userId: loggedInUser
    }
  );
};

export const upload = uploadData => {
  return axios.post(`${baseURL}/upload`, uploadData);
};

export const addPost = formData => {
  return axios.post(`${baseURL}/create`, formData);
};
