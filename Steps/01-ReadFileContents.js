// get file name from std input
// read the file
// stream it to the std output

import fs from "node:fs";
import readline from "node:readline";

// ----------------------------------------------------------------------------------

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Enter file name \n", (fileName) => {
//   rl.close();
//   console.log(`Assembling ${fileName}`);

//   fs.readFile(`./${fileName}`, "utf8", (_, hackFile) => {
//     console.log(hackFile);

//   });
// });

// ----------------------------------------------------------------------------------

// function rlPromise() {
//   return new Promise((resolve, reject) => {
//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });

//     rl.question("Enter file name \n", (fileName) => {
//       rl.close();
//       console.log(`Assembling ${fileName} \n`);
//       resolve(fileName);
//     });
//   });
// }

// function readFilePromise(fileName) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(`./${fileName}`, "utf8", (_, fileContents) => {
//       resolve(fileContents);
//     });
//   });
// }

// rlPromise()
//   .then((fileName) => {
//     return readFilePromise(fileName);
//   })
//   .then((fileContents) => {
//     console.log(fileContents);
//   });

// ----------------------------------------------------------------------------------

function getFileName() {
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

function getFileContents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (_, fileContents) => {
      console.log(`Assembling ${filePath}`)
      resolve(fileContents);
    });
  });
}

async function main() {
  const fileName = await getFileName();
  const filePath = `./${fileName}`;
  const fileContents = await getFileContents(filePath);
  console.log(fileContents);
}

main();
