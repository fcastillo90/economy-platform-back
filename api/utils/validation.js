const checkIfArrayInArray = (array, options) => array.some(type => options.includes(type));
const checkIfValueInArray = (value, options) => options.includes(value);
const isValidDate = date => {
  const separators = ['\\-'];
  const bits = date.split(new RegExp(separators.join('|'), 'g'));
  const d = new Date(bits[2], bits[1] - 1, bits[0]);
  return d.getFullYear() === +bits[2] && d.getMonth() + 1 === +bits[1];
};
const dateFormatter = date => {
  const separators = ['\\-'];
  const bits = date.split(new RegExp(separators.join('|'), 'g'));
  const d = new Date(bits[2], bits[1] - 1, bits[0]);
  return { day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear() };
};

export default { checkIfArrayInArray, checkIfValueInArray, isValidDate, dateFormatter };
