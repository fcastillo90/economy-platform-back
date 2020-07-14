import { get } from 'axios';

const getFromApi = async ({ url = null }) => {
  if (url == null || url === '') {
    throw new Error("url can't be null or empty");
  }
  const headers = {};
  return get(url, { headers })
    .then(response => response)
    .catch(error => error);
};
const request = {
  getFromApi
};

export default request;
