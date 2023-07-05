import Commander from "./Commander.js";
import input from "./input.js";

const run = () => {
  const Cmd = new Commander();

  input((command) => Cmd.play(command));
};

run();
