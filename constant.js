const freeze = (object) => {
  return Object.freeze(object);
};

const STATUS = freeze({
  TODO: "todo",
  DOING: "doing",
  DONE: "done",
});

const COMMAND = freeze({
  SHOW: "show",
  ADD: "add",
  DELETE: "delete",
  UPDATE: "update",
});

const SUB_COMMAND = freeze({
  SHOW_ALL: "all",
  SHOW_TODO: "todo",
});

const ERROR_MSG = freeze({
  NOT_ENOUGH_ARGS: "인자가 충분하지 않습니다",
  NOT_EXIST_COMMAND: "없는 명령어 입니다.",
  NOT_EXIST_ID: "없는 id 입니다.",
  NOT_EXIST_STATUS: "없는 상태입니다.",
});

module.exports = {
  STATUS,
  COMMAND,
  SUB_COMMAND,
  ERROR_MSG,
};
