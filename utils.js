import chalk from "chalk";
import { v4 } from "uuid";

import { COMMAND, ERROR_MSG, REGEX_STRING_ARRAY } from "./constant.js";

export const validate = (command) => {
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

export const getUniqueId = () => {
  return v4();
};

export const parseArrayString = (arrayString) => {
  if (!REGEX_STRING_ARRAY.test(arrayString)) {
    throw Error(ERROR_MSG.WRONG_TAGS);
  }

  return JSON.parse(arrayString);
};

export const errorLog = (message) => {
  console.log(chalk.bold.red(message));
};

export const yellowLog = (message) => {
  console.log(chalk.bold.inverse.yellow(message));
};

export const dimLog = (message) => {
  console.log(chalk.gray(message));
};
