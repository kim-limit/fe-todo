const { COMMAND, STATUS, SHOW_SUB_COMMAND, ERROR_MSG } = require("./constant");
const { validate, getUniqueId, parseArrayString } = require("./utils");

/**
 * @typedef TodoItem
 * @type {object}
 * @property {string} name - 이름
 * @property {string[]} tags - 태그 리스트  tags: string[]
 * @property {STATUS} status - 상태
 */

class Commander {
  /** @type {Map<string,TodoItem} */
  #todos;
  #counts;
  #totalCount;

  constructor() {
    this.#todos = new Map();
    this.#totalCount = 0;
    this.#counts = {
      [STATUS.TODO]: 0,
      [STATUS.DOING]: 0,
      [STATUS.DONE]: 0,
    };
  }

  // 1. add 구현
  // 2. print all 리팩토링
  // 3.
  play(command) {
    const { type, args } = validate(command);

    switch (type) {
      case COMMAND.SHOW:
        this.#show(args);
        break;
      case COMMAND.ADD:
        this.#add(args);
        break;
      case COMMAND.UPDATE:
        this.#update(args);
        break;
      case COMMAND.DELETE:
        this.#delete(args);
        break;
    }

    console.log();
  }

  #add(args) {
    if (args.length < 1 || args.length > 2) {
      throw Error(ERROR_MSG.WRONG_ARGS);
    }

    const [name, tags] = args;

    const todo = {
      name,
      tags: parseArrayString(tags),
      status: STATUS.TODO,
    };
    const id = getUniqueId();

    this.#todos.set(id, todo);

    this.#updateCount(STATUS.TODO, 1);

    console.log(`${name} 1개가 추가됐습니다. (id: ${id})`);

    this.#printAll();
  }

  #update(args) {
    if (args.length !== 2) {
      throw Error(ERROR_MSG.WRONG_ARGS);
    }

    const [id, status] = args;

    if (!STATUS[status.toUpperCase()]) {
      throw Error(ERROR_MSG.NOT_EXIST_STATUS);
    }

    if (!this.#checkIdExist(id)) {
      throw Error(ERROR_MSG.NOT_EXIST_ID);
    }

    const todo = this.#todos.get(id);

    this.#updateCount(todo.status, -1);
    todo.status = status.toUpperCase();
    this.#updateCount(todo.status, 1);

    console.log(`${todo.name} ${status}으로 상태가 변경됐습니다.`);

    this.#printAll();
  }

  #delete(args) {
    if (args.length !== 1) {
      throw Error(ERROR_MSG.WRONG_ARGS);
    }

    const id = args[0];

    if (!this.#checkIdExist(id)) {
      throw Error(ERROR_MSG.NOT_EXIST_ID);
    }

    const todo = this.#todos.get(id);

    console.log(`${todo.name} (${todo.status})가 목록에서 삭제됐습니다.`);

    this.#updateCount(todo.status, -1);
    this.#todos.delete(id);

    this.#printAll();
  }

  #show(args) {
    const subCommand = args[0];

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
      `-------------------------------------------------------------\n` +
        `현재상태: todo: ${TODO}개, doing: ${DOING}개, done: ${DONE}개\n` +
        `-------------------------------------------------------------\n`
    );
  }

  #printTodo() {
    // TODO: map -> array 변환후 reduce로 출력
    console.log(
      this.#todos.reduce((acc, curr, idx) => {
        const { id, name } = curr;

        return acc + `${idx}. ${name} (${id}번)\n`;
      }, `todo리스트 : 총 ${this.#totalCount}건\n`)
    );
  }

  #checkIdExist(id) {
    return this.#todos.has(id);
  }

  #updateCount(status, offset) {
    this.#counts[status] += offset;
    this.#totalCount += offset;
  }
}

module.exports = Commander;
