import { COMMAND, STATUS, SHOW_SUB_COMMAND, ERROR_MSG } from "./constant.js";
import {
  validate,
  getUniqueId,
  parseArrayString,
  yellowLog,
  dimLog,
} from "./utils.js";

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

    if (type !== COMMAND.SHOW) {
      this.#printAll();
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

    dimLog(`${name} 1개가 추가됐습니다. (id: ${id})`);
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

    dimLog(`${todo.name} ${status}으로 상태가 변경됐습니다.`);
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

    dimLog(`${todo.name} (${todo.status})가 목록에서 삭제됐습니다.`);

    this.#updateCount(todo.status, -1);
    this.#todos.delete(id);
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

    this.#printStatus(uppered);
  }

  #printAll() {
    const { TODO, DOING, DONE } = this.#counts;

    yellowLog(`현재상태: todo: ${TODO}개, doing: ${DOING}개, done: ${DONE}개`);
  }

  #printStatus(status) {
    const filtered = [...this.#todos].filter(
      ([_, item]) => item.status === status
    );
    console.log(
      filtered.reduce(
        (acc, [id, item], idx) => acc + `${idx}. ${item.name} (id: ${id})\n`,
        `${status}리스트 : 총 ${filtered.length}건\n`
      )
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

export default Commander;
