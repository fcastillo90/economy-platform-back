import responseCodes from '../../config/responseCodes';
import responseFormatter from '../../utils/responseFormatter';
import valuesService from '../../services/valuesService';

const getValues = async (req, res) => {
  try {
    const { headers, query, params } = req;

    const { status, body } = await valuesService.getValuesService({ query, headers, params });
    return res.status(status).json(body);
  } catch (err) {
    const response = await responseFormatter.formatter(responseCodes.BAD_REQUEST, []);
    return res.status(response.status).json(response.body);
  }
};

export default {
  getValues
};
