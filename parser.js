import fs from "node:fs";
import readline from "node:readline";

// ----------------------------------------------------------------------------------

export function getFileName() {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter file name \n", (fileName) => {
      rl.close();
      resolve(fileName);
    });
  });
}

export function getFileContents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (_, fileContents) => {
      console.log(`Assembling ${filePath}`);
      resolve(fileContents);
    });
  });
}

export function appendContent() {
  return new Promise((resolve, reject) => {
    const content = "\njngjrbnrjgntjlkb7nljtrmgbekojmbkr\n";
    fs.appendFile("Prog.hack", content, () => {
      resolve(`Content added to Prog.hack!`);
    });
  });
}

// ----------------------------------------------------------------------------------

export function hasMoreLines(line) {}

export function advance() {}

export function instructionType(instructionString) {
  if (instructionString[0] == "@") {
    instructionString = instructionString.slice(1);
    if (
      parseInt(instructionString) ||
      /^[a-zA-Z0-9]+$/.test(instructionString)
    ) {
      return "A_INSTRUCTION";
    }
  } else if (
    instructionString.includes("=") ||
    instructionString.includes(";")
  ) {
    return "C_INSTRUCTION";
  } else if (
    instructionString.startsWith("(") &&
    instructionString.endsWith(")")
  ) {
    return "L_INSTRUCTION";
  } else {
    return "Invalid Instruction";
  }
}
