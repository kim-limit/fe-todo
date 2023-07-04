const { COMMAND, ERROR_MSG } = require("./constant");
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

module.exports = {
  validate,
  getUniqueId,
};
