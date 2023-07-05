const { COMMAND, ERROR_MSG, REGEX_STRING_ARRAY } = require("./constant");
const { v4 } = require("uuid");

const validate = (command) => {
  const splited = command.split("$");

  if (splited.length <= 1) {
    throw Error(ERROR_MSG.NOT_ENOUGH_ARGS);
  }

  const mainCommand = splited[0].toUpperCase();

  if (!COMMAND[mainCommand]) {
    throw Error(ERROR_MSG.NOT_EXIST_COMMAND);
  }

  return { type: mainCommand, args: splited.slice(1) };
};

const getUniqueId = () => {
  return v4();
};

const parseArrayString = (arrayString) => {
  if (!REGEX_STRING_ARRAY.test(arrayString)) {
    throw Error(ERROR_MSG.WRONG_TAGS);
  }

  return JSON.parse(arrayString);
};

module.exports = {
  validate,
  getUniqueId,
  parseArrayString,
};
