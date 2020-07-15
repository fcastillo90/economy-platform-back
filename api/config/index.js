const DEFAULT_LIMIT = 50;
const DEFAULT_PAGE = 0;
const REDIS_EXPIRATION_TIME = 120;
const ACCEPTED_KEYS = ['cobre', 'dolar', 'euro', 'ipc', 'ivp', 'oro', 'plata', 'uf', 'utm', 'yen'];
const PATH_LAST = '/last';
const PATH_VALUES = ({ key }) => `/values/${key}`;
const PATH_DATE = ({ key, date }) => `/date/${key}/${date}`;

export default { REDIS_EXPIRATION_TIME, DEFAULT_LIMIT, DEFAULT_PAGE, ACCEPTED_KEYS, PATH_LAST, PATH_VALUES, PATH_DATE };
