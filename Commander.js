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
    this.#todos = [
      {
        name: "자바스크립트 공부하기",
        tags: ["programming", "javascript"],
        status: "todo",
        id: 12123123,
      },
      {
        name: "그림 그리기",
        tags: ["picture", "favorite"],
        status: "doing",
        id: 312323,
      },
    ];
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

  #printTodo() {
    console.log(
      this.#todos.reduce((acc, curr, idx) => {
        const { id, name } = curr;

        return acc + `${idx}. ${name} (${id}번)\n`;
      }, `todo리스트 : 총 ${this.#totalCount}건\n`)
    );
  }
}

module.exports = Commander;
