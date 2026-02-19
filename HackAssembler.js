// get file name from std input
// read the file
// stream it to the std output

import {
  getFileName,
  getFileContents,
  instructionType,
  symbol,
  destSymbol,
  compSymbol,
  jumpSymbol,
} from "./parser.js";

import { destCode, compCode, jumpCode } from "./code.js";

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
      const destMnemonic = destSymbol(instructionString);
      const destBinary = destCode(destMnemonic);

      const compMnemonic = compSymbol(instructionString);
      const compBinary = compCode(compMnemonic);

      const jumpMnemonic = jumpSymbol(instructionString);
      const jumpBinary = jumpCode(jumpMnemonic);

      console.log(
        `dest: ${destMnemonic} - ${destBinary},\n`
        + `comp: ${compMnemonic} - ${compBinary},\n`
        + `jump: ${jumpMnemonic} - ${jumpBinary},\n`,
      );
    }
  }

  // const appendResult = await appendContent();
  // console.log(appendResult);
}

main();
