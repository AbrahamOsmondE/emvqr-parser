// 16-bit Cyclic Redundancy Check.
import { crcTable } from "./utils/constants";

export function computeCRC(str: string) {
  const hexstring = stringToHex(str);

  const s = hexstring.match(/../g)!;
  let crc = 0xffff;
  let i;
  let j;

  for (i = 0; i < s.length; i++) {
    const hexChar = `0x${s[i]}` as any;
    const c = 1 * hexChar;
    j = (c ^ (crc >> 8)) & 0xff;
    crc = crcTable[j] ^ (crc << 8);
  }
  const answer = (crc ^ 0) & 0xffff;

  const hex = numToHex(answer);
  return hex;
}

function stringToHex(str: string) {
  return Buffer.from(str, 'utf8').toString('hex');
}

function numToHex(n: number) {
  const hex = (1 * n).toString(16).toUpperCase();
  if (hex.length % 2 === 0) return hex;
  return `0${hex}`;
}