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

function initializeSymbolTable() {
  let symbolTableObject = {
    R0: "0",
    R2: "2",
    R1: "1",
    R3: "3",
    R4: "4",
    R5: "5",
    R6: "6",
    R7: "7",
    R8: "8",
    R9: "9",
    R10: "10",
    R11: "11",
    R12: "12",
    R13: "13",
    R14: "14",
    R15: "15",
    SP: "0",
    LCL: "1",
    ARG: "2",
    THIS: "3",
    THAT: "4",
    SCREEN: "16384",
    KBD: "24576",
  };

  return symbolTableObject;
}

function addEntry(symbolString, address) {
  symbolTableObject[symbolString] = address;
  return 0;
}

function contains(symbolString) {
  return symbolTableObject[symbolString] ? 1 : 0;
}

function getAddress(symbolString) {
  return symbolTableObject[symbolString];
}

// ----------------------------------------------------------------------------------

async function fileExists(filepath) {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}
function decimalToBinary(decimalString) {
  const decimalValue = parseInt(decimalString);
  const binaryString = decimalValue.toString(2).padStart(15, "0");
  return binaryString;
}

// ----------------------------------------------------------------------------------

let symbolTableObject = initializeSymbolTable();

async function main() {
  const inputFileName = await getFileName();
  const inputFilePath = `./${inputFileName}`;

  const outputFileName = inputFileName.split(".asm")[0] + ".hack";
  const outputFilePath = `./${outputFileName}`;

  const inputFileContents = await getFileContents(inputFilePath);

  // const instructionStringArray = inputFileContents.split("\n");
  const instructionStringArray = inputFileContents
    .split("\n")
    .map((line) => {
      // Remove comments (everything after //)
      const commentIndex = line.indexOf("//");
      return commentIndex !== -1 ? line.substring(0, commentIndex) : line;
    })
    .map((line) => line.trim()) // Remove whitespace
    .filter((line) => line !== ""); // Remove blank lines
  // advance();

  if (await fileExists(outputFilePath)) {
    await fs.rm(outputFilePath);
  }

  let instructionCounter = -1;

  for (let i = 0; i < instructionStringArray.length; i++) {
    const instructionString = instructionStringArray[i].trim();
    const x = instructionType(instructionString);

    if (x == "L_INSTRUCTION") {
      const symbolString = symbol(instructionString);
      const address = instructionCounter + 1;
      addEntry(symbolString, address);
    } else if (x == "A_INSTRUCTION" || x == "C_INSTRUCTION") {
      instructionCounter++;
      continue;
    } else {
      continue;
    }
  }

  let variableSymbolCounter = 0;
  for (let i = 0; i < instructionStringArray.length; i++) {
    const instructionString = instructionStringArray[i].trim();
    const x = instructionType(instructionString);

    if (x == "A_INSTRUCTION") {
      try {
        let decimalString;
        const symbolString = symbol(instructionString);
        if (parseInt(symbolString) || symbolString == "0") {
          decimalString = symbolString;
        } else if (contains(symbolString)) {
          decimalString = getAddress(symbolString);
        } else {
          variableSymbolCounter++;
          const address = (15 + variableSymbolCounter).toString();
          addEntry(symbolString, address);
          decimalString = address;
        }

        const binaryString = decimalToBinary(decimalString);

        const content = "0" + binaryString + "\n";
        await fs.appendFile(outputFilePath, content);
      } catch (err) {
        console.error("Error: ", err);
      }
    } else if (x == "C_INSTRUCTION") {
      try {
        const compMnemonic = compSymbol(instructionString);
        const destMnemonic = destSymbol(instructionString);
        const jumpMnemonic = jumpSymbol(instructionString);

        const compBinary = compCode(compMnemonic);
        const destBinary = destCode(destMnemonic);
        const jumpBinary = jumpCode(jumpMnemonic);

        const content = "111" + compBinary + destBinary + jumpBinary + "\n";

        await fs.appendFile(outputFilePath, content);
      } catch (err) {
        console.error("Error: ", err);
      }
    }
  }

  let outputContent = await fs.readFile(outputFilePath, "utf8");
  outputContent = outputContent.trimEnd();
  await fs.writeFile(outputFilePath, outputContent);

  console.log(`Assembly completed! Output: ${outputFilePath}`);
}

main();
