import { createInterface } from "readline";

import { errorLog } from "./utils.js";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = (callback) => {
  rl.setPrompt(`-------------------------------------------------------------
명령하세요(exit 입력시 종료): `);
  rl.prompt();

  rl.on("line", (command) => {
    if (command === "exit") {
      console.log("종료합니다.");
      rl.close();
    }

    try {
      console.log();
      callback(command);
    } catch (err) {
      errorLog(`error: ${err.message}\n`);
    }
    rl.prompt();
  }).on("close", () => process.exit(0));
};

export default input;
