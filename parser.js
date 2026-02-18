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

export function instructionType(instructionString) {

    if(instructionString)


    return instructionType;

}
