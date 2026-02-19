export function destCode(destMnemonic) {
  let a_bit, d_bit, m_bit, code;

  a_bit = destMnemonic.includes("A") ? "1" : "0";
  d_bit = destMnemonic.includes("D") ? "1" : "0";
  m_bit = destMnemonic.includes("M") ? "1" : "0";

  code = a_bit + d_bit + m_bit;

  return code;
}

export function compCode(compMnemonic) {
  let a_bit, comp_bits, code;

  a_bit = compMnemonic.includes("M") ? "1" : "0";

  const compCodeMap = {
    0: "101010",
    1: "111111",
    "-1": "111010",
    D: "001100",
    A: "110000",
    M: "110000",
    "!D": "001101",
    "!A": "110001",
    "!M": "110001",
    "-D": "001111",
    "-A": "110011",
    "-M": "110011",
    "D+1": "011111",
    "A+1": "110111",
    "M+1": "110111",
    "D-1": "001110",
    "A-1": "110010",
    "M-1": "110010",
    "D+A": "000010",
    "D+M": "000010",
    "D-A": "010011",
    "D-M": "010011",
    "A-D": "000111",
    "M-D": "000111",
    "D&A": "000000",
    "D&M": "000000",
    "D|A": "010101",
    "D|M": "010101",
  };

  comp_bits = compCodeMap[compMnemonic];

  code = a_bit + comp_bits;

  return code;
}

export function jumpCode(jumpMnemonic) {
  let gtz_bit, eqz_bit, ltz_bit, code;
  if (jumpMnemonic == "null") {
    gtz_bit = eqz_bit = ltz_bit = "0";
  } else if (jumpMnemonic == "JGT") {
    ltz_bit = "0";
    eqz_bit = "0";
    gtz_bit = "1";
  } else if (jumpMnemonic == "JEQ") {
    ltz_bit = "0";
    eqz_bit = "1";
    gtz_bit = "0";
  } else if (jumpMnemonic == "JGE") {
    ltz_bit = "0";
    eqz_bit = "1";
    gtz_bit = "1";
  } else if (jumpMnemonic == "JLT") {
    ltz_bit = "1";
    eqz_bit = "0";
    gtz_bit = "0";
  } else if (jumpMnemonic == "JNE") {
    ltz_bit = "1";
    eqz_bit = "0";
    gtz_bit = "1";
  } else if (jumpMnemonic == "JLE") {
    ltz_bit = "1";
    eqz_bit = "1";
    gtz_bit = "0";
  } else if (jumpMnemonic == "JMP") {
    ltz_bit = "1";
    eqz_bit = "1";
    gtz_bit = "1";
  }

  code = ltz_bit + eqz_bit + gtz_bit;

  return code;
}
