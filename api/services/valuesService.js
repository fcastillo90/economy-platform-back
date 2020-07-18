import moment from 'moment';
import responseFormatter from '../utils/responseFormatter';
import responseCodes from '../config/responseCodes';
import constants from '../config';
import request from '../utils/request';
import validation from '../utils/validation';
import redisClient from '../config/redisClient';

const checkIfValueInRedis = async key => {
  if (key && validation.checkIfValueInArray(key, constants.ACCEPTED_KEYS)) {
    const url = constants.PATH_VALUES({ key });
    const response = await redisClient.getAsync({
      key,
      ifNotInRedis: () => request.handleQuery({ path: url })
    });

    const body = await responseFormatter.formatter(response.status, response.body);
    const { status } = body;
    return { body, status };
  }
  return false;
};

const handleValueFormatter = async passedState => {
  const raw = {};
  Object.entries(passedState.values).forEach(entrie => {
    raw[entrie[0]] = {
      date: moment.unix(entrie[0]).format('DD-MM-YYYY'),
      [passedState.key]: entrie[1]
    };
  });
  const formattedData = Object.entries(raw).map(entrie => ({
    ...raw[entrie[0]]
  }));
  return formattedData;
};

const getValuesService = async ({ params }) => {
  try {
    let status = responseCodes.BAD_REQUEST.code;
    let body = {
      status: responseCodes.BAD_REQUEST.code,
      message: responseCodes.BAD_REQUEST.message,
      data: {}
    };
    const response = await checkIfValueInRedis(params.key);
    const graphicData = await handleValueFormatter(response.body.data);

    if (response && graphicData) {
      ({ status, body } = response);
      body.data.graphicData = graphicData;
    }
    return { status, body };
  } catch (error) {
    const body = await responseFormatter.formatter(responseCodes.BAD_REQUEST, []);
    const { status } = body;
    return { status, body };
  }
};

export default { getValuesService };
