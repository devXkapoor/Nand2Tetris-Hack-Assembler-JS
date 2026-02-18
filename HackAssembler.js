// get file name from std input
// read the file
// stream it to the std output

import {
  getFileName,
  getFileContents,
  instructionType,
} from "./parser.js";

// ----------------------------------------------------------------------------------

async function main() {
  const fileName = await getFileName();
  const filePath = `./${fileName}`;

  const fileContents = await getFileContents(filePath);
  // console.log(fileContents);
  const lines = fileContents.split("\n");

  // advance();

  for (let i = 0; i < lines.length; i++) {
    const x = instructionType(lines[i]);
    console.log(`Line ${i} : ${x} : ${lines[i]}`);
  }

  // const appendResult = await appendContent();
  // console.log(appendResult);
}

main();
