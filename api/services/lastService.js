import responseFormatter from '../utils/responseFormatter';
import responseCodes from '../config/responseCodes';
import constants from '../config';
import request from '../utils/request';
import redisClient from '../config/redisClient';

// eslint-disable-next-line no-unused-vars
const getLastService = async ({ query, consumer }) => {
  try {
    let status = responseCodes.BAD_REQUEST.code;
    let body = {
      status: responseCodes.BAD_REQUEST.code,
      message: responseCodes.BAD_REQUEST.message,
      data: {}
    };
    const key = constants.PATH_LAST;
    const response = await redisClient.getAsync({
      key,
      ifNotInRedis: () => request.handleQuery({ path: key })
    });

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
