const { COMMAND, STATUS, SHOW_SUB_COMMAND, ERROR_MSG } = require("./constant");
const { validate } = require("./utils");

/**
 * @typedef TodoItem
 * @type {object}
 * @property {string} name - 이름
 * @property {string[]} tags - 태그 리스트  tags: string[]
 * @property {STATUS} status - 상태
 * @property {string} id - uuid
 */

class Commander {
  /** @type {TodoItem[]} */
  #todos;
  #counts;
  #totalCount;

  constructor() {
    this.#todos = [];
    this.#totalCount = 0;
    this.#counts = {
      [STATUS.TODO]: 0,
      [STATUS.DOING]: 0,
      [STATUS.DONE]: 0,
    };
  }

  play(command) {
    const { type, args } = validate(command);
    console.log(type, args);

    switch (type) {
      case COMMAND.SHOW:
        this.#show(args[0]);
        break;
      case COMMAND.ADD:
        this.#add(args[0], args[1]);
        break;
      case COMMAND.UPDATE:
        this.#update(args[0], args[1]);
        break;
      case COMMAND.DELETE:
        this.#delete(args[0]);
        break;
    }
  }

  #add(name, tags) {}

  #update(id, status) {}

  #delete(id) {}

  #show(subCommand) {
    const uppered = subCommand.toUpperCase();
    if (!SHOW_SUB_COMMAND[uppered]) {
      throw Error(ERROR_MSG.NOT_EXIST_SUB_COMMAND);
    }

    if (uppered === SHOW_SUB_COMMAND.ALL) {
      this.#printAll();
      return;
    }

    this.#printTodo();
  }

  #printAll() {
    const { TODO, DOING, DONE } = this.#counts;
    console.log(
      `현재상태: todo: ${TODO}개, doing: ${DOING}개, done: ${DONE}개`
    );
  }

  #printTodo() {}
}

module.exports = Commander;
