// get file name from std input
// read the file
// stream it to the std output

import {
  getFileName,
  getFileContents,
  instructionType,
  symbol,
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
    const instructionString = lines[i].trim();
    const x = instructionType(instructionString);
    console.log(`Line ${i} : ${x} : ${instructionString}`);

    if (x == "A_INSTRUCTION" || x == "L_INSTRUCTION") {
      const y = symbol(instructionString);
      console.log(`Symbol: ${y}`);
    }
  }

  // const appendResult = await appendContent();
  // console.log(appendResult);
}

main();
