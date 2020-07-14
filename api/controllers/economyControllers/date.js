import responseCodes from '../../config/responseCodes';
import responseFormatter from '../../utils/responseFormatter';
import seedService from '../../services/seedService';

const getHelloWorld = async (req, res) => {
  try {
    const { headers, query } = req;

    const { status, body } = await seedService.seedService({ query, headers });
    return res.status(status).json(body);
  } catch (err) {
    const response = await responseFormatter.formatter(responseCodes.BAD_REQUEST, []);
    return res.status(response.status).json(response.body);
  }
};

export default {
  getHelloWorld
};
