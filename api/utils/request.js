import { get } from 'axios';
import responseCodes from '../config/responseCodes';

const getFromApi = async ({ url = null }) => {
  if (url == null || url === '') {
    throw new Error("url can't be null or empty");
  }
  const headers = {};
  return get(url, { headers })
    .then(response => response)
    .catch(error => error);
};

const handleQuery = async ({ path }) => {
  let status = responseCodes.BAD_REQUEST.code;
  let body = {};

  const response = await getFromApi({ url: `${process.env.API_URL}${path}` });
  if (response.status === 200) {
    body = response.data;
    status = responseCodes.OK;
  }
  return { body, status };
};

const request = {
  getFromApi,
  handleQuery
};
export default request;
