import responseCodes from '../../config/responseCodes';
import responseFormatter from '../../utils/responseFormatter';
import lastService from '../../services/lastService';

const getLast = async (req, res) => {
  try {
    const { headers, query } = req;

    const { status, body } = await lastService.getLastService({ query, headers });
    return res.status(status).json(body);
  } catch (err) {
    const response = await responseFormatter.formatter(responseCodes.BAD_REQUEST, []);
    return res.status(response.status).json(response.body);
  }
};

export default {
  getLast
};
