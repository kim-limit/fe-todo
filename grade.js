const Commander = require("./Commander");
const input = require("./input");

const run = () => {
  const Cmd = new Commander();

  input((command) => Cmd.play(command));
};

run();
