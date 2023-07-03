const STATUS = require("./constant");

/**
 * @typedef TodoItem
 * @type {object}
 * @property {string} name - 이름
 * @property {string[]} tags - 태그 리스트  tags: string[]
 * @property {STATUS} status - 상태
 * @property {string} id - uuid
 */

/** @type {TodoItem[]} */
const todos = [];
