const formatter = async (status, data) => ({
  status: status.code,
  message: status.message,
  data
});
export default {
  formatter
};
