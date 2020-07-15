import responseFormatter from '../utils/responseFormatter';
import responseCodes from '../config/responseCodes';
import constants from '../config';
import request from '../utils/request';
import validation from '../utils/validation';
import redisClient from '../config/redisClient';

// eslint-disable-next-line no-unused-vars
const getDateService = async ({ query, consumer, params }) => {
  try {
    let status = responseCodes.BAD_REQUEST.code;
    let body = {
      status: responseCodes.BAD_REQUEST.code,
      message: responseCodes.BAD_REQUEST.message,
      data: {}
    };

    if (
      params.key &&
      params.date &&
      validation.isValidDate(params.date) &&
      validation.checkIfValueInArray(params.key, constants.ACCEPTED_KEYS)
    ) {
      const { day, month, year } = validation.dateFormatter(params.date);
      const key = constants.PATH_DATE({ key: params.key, date: `${day}-${month}-${year}` });
      const response = await redisClient.getAsync({
        key,
        ifNotInRedis: () => request.handleQuery({ path: key })
      });

      const format = await responseFormatter.formatter(response.status, response.body);
      ({ status } = format);
      body = format;
    }
    return { status, body };
  } catch (error) {
    const body = await responseFormatter.formatter(responseCodes.BAD_REQUEST, []);
    const { status } = body;
    return { status, body };
  }
};

export default { getDateService };
