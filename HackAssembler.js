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

import fs from "node:fs/promises";

// ----------------------------------------------------------------------------------

async function main() {
  const inputFileName = await getFileName();
  const inputFilePath = `./${inputFileName}`;

  const outputFileName = inputFileName.split(".asm")[0] + ".hack";
  const outputFilePath = `./${outputFileName}`;

  const inputFileContents = await getFileContents(inputFilePath);

  const instructionStringsArray = inputFileContents.split("\n");

  // advance();

  await fs.rm(outputFilePath);

  for (let i = 0; i < instructionStringsArray.length; i++) {
    const instructionString = instructionStringsArray[i].trim();
    const x = instructionType(instructionString);

    if (x == "A_INSTRUCTION" || x == "L_INSTRUCTION") {
      try {
        const content = "0" + symbol(instructionString) + "\n";
        await fs.appendFile(outputFilePath, content);
      } catch (err) {
        console.error("Error: ", err);
      }
    }

    if (x == "C_INSTRUCTION") {
      try {
        const destMnemonic = destSymbol(instructionString);
        const compMnemonic = compSymbol(instructionString);
        const jumpMnemonic = jumpSymbol(instructionString);

        const destBinary = destCode(destMnemonic);
        const compBinary = compCode(compMnemonic);
        const jumpBinary = jumpCode(jumpMnemonic);

        const content = destBinary + compBinary + jumpBinary + "\n";

        await fs.appendFile(outputFilePath, content);
      } catch (err) {
        console.error("Error: ", err);
      }
    }
  }
}

main();
