import { name, version as _version } from '../../../package.json';

const getVersion = () => {
  return {
    app: name,
    version: _version,
    registry_name: process.env.REGISTRY_NAME
  };
};

const VersionController = {
  getVersion
};

export default VersionController;
