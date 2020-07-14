import redis from 'redis';
import bluebird from 'bluebird';
import constants from './index';
import responseCodes from './responseCodes';

const client = redis.createClient(process.env.REDIS_URL);
bluebird.promisifyAll(redis);

const setAsync = ({ key, body }) => {
  client.set(key, body, 'EX', constants.REDIS_EXPIRATION_TIME);
};

const getAsync = ({ key, ifNotInRedis }) =>
  client.getAsync(key).then(async response => {
    if (response) return { status: responseCodes.OK, body: JSON.parse(response) };

    const { status, body } = await ifNotInRedis();

    await setAsync({ key, body: JSON.stringify(body) });

    return { status, body };
  });

export default { getAsync, setAsync };
