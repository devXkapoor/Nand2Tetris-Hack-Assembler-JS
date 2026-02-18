// get file name from std input
// read the file
// stream it to the std output

import {
  getFileName,
  getFileContents,
  instructionType,
  symbol,
  dest,
  comp,
  jump,
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

    if (x == "C_INSTRUCTION") {
      const destPart = dest(instructionString);
      const compPart = comp(instructionString);
      const jumpPart = jump(instructionString);
      console.log(`dest: ${destPart}, comp: ${compPart}, jump: ${jumpPart}`)
    }
  }

  // const appendResult = await appendContent();
  // console.log(appendResult);
}

main();
