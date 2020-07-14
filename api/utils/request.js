import { get, post, put } from 'axios';

const getFromApi = async ({ url = null, token = '' }) => {
  if (url == null || url === '') {
    throw new Error("url can't be null or empty");
  }
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return get(url, { headers })
    .then(response => response)
    .catch(error => error);
};
const postToApi = async ({ body = {}, url = null, token = '' }) => {
  if (url == null || url === '') throw new Error("url can't be null or empty");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  return post(url, body, { headers })
    .then(response => response)
    .catch(error => error);
};
const putToApi = ({ body = {}, url = null }) => {
  if (url == null || url === '') {
    throw new Error("url can't be null or empty");
  }
  const headers = {
    'Content-Type': 'application/json; charset=utf-8'
  };
  return put(url, body, { headers })
    .then(response => response)
    .catch(error => error);
};
const request = {
  getFromApi,
  postToApi,
  putToApi
};

export default request;
