const { STATUS } = require("./constant");
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

  constrcutor() {
    this.#todos = [];
  }

  play(command) {
    const meta = validate(command);
    console.log(meta);
  }

  #add(name, tags) {}

  #update(id, status) {}

  #delete(id) {}

  #showAll() {}

  #showTodo() {}
}

module.exports = Commander;
