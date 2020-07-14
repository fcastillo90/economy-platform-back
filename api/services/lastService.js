import responseFormatter from '../utils/responseFormatter';
import responseCodes from '../config/responseCodes';
import request from '../utils/request';
import redisClient from '../config/redisClient';

const handleQuery = async () => {
  let status = responseCodes.BAD_REQUEST.code;
  let body = {};

  const response = await request.getFromApi({ url: 'https://www.indecon.online/last' });
  if (response.status === 200) {
    body = response.data;
    status = responseCodes.OK;
  }
  return { body, status };
};

// eslint-disable-next-line no-unused-vars
const getLastService = async ({ query, consumer }) => {
  try {
    let status = responseCodes.BAD_REQUEST.code;
    let body = {
      status: responseCodes.BAD_REQUEST.code,
      message: responseCodes.BAD_REQUEST.message,
      data: {}
    };

    const response = await redisClient.getAsync({ key: 'last', ifNotInRedis: handleQuery });

    const format = await responseFormatter.formatter(response.status, response.body);
    ({ status } = format);
    body = format;

    return { status, body };
  } catch (error) {
    const body = await responseFormatter.formatter(responseCodes.BAD_REQUEST, []);
    const { status } = body;
    return { status, body };
  }
};

export default { getLastService };
