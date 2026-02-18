// get file name from std input
// read the file
// stream it to the std output

import { getFileName, getFileContents } from "./parser";

// ----------------------------------------------------------------------------------

async function main() {
  const fileName = await getFileName();
  const filePath = `./${fileName}`;

  const fileContents = await getFileContents(filePath);
  const lines = fileContents.split("\n");

  for (let i = 0; i < lines.length; i++) {

    


  }

  // const appendResult = await appendContent();
  // console.log(appendResult);
}

main();
