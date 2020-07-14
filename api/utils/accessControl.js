import validations from './validation';

const checkPermissions = (userPermissions = [], allowedPermissions = []) =>
  allowedPermissions.length === 0 ? false : validations.checkIfInArray(userPermissions, allowedPermissions);

const accessControl = {
  checkPermissions
};
export default accessControl;
