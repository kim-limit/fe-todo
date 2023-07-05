const freeze = (object) => {
  return Object.freeze(object);
};

const STATUS = freeze({
  TODO: "TODO",
  DOING: "DOING",
  DONE: "DONE",
});

const COMMAND = freeze({
  SHOW: "SHOW",
  ADD: "ADD",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
});

const SHOW_SUB_COMMAND = freeze({
  ALL: "ALL",
  TODO: "TODO",
});

const ERROR_MSG = freeze({
  NOT_ENOUGH_ARGS: "인자가 충분하지 않습니다",
  NOT_EXIST_COMMAND: "없는 명령어 입니다.",
  NOT_EXIST_SUB_COMMAND: "show는 all과 todo만 사용가능합니다.",
  NOT_EXIST_ID: "없는 id 입니다.",
  NOT_EXIST_STATUS: "없는 상태입니다.",
  WRONG_ARGS: "인자가 정확하지 않습니다",
  WRONG_TAGS: "태그 형식이 적절하지 않습니다.",
});

const REGEX_STRING_ARRAY = /^\s*\[\s*("[^"]+"\s*,\s*)*"[^"]*"\s*\]\s*$/;

module.exports = {
  STATUS,
  COMMAND,
  SHOW_SUB_COMMAND,
  ERROR_MSG,
  REGEX_STRING_ARRAY,
};
