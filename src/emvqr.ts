import { NestedData, ParsedQR } from './core';
import { computeCRC } from './crc';
import { getTag, getSubTag, getCustomSubtag, getCustomTag } from './schema';
const validate = (text: string) => {
  const data = text.substring(0, text.length - 4);
  const checksum = text.substring(text.length - 4).toUpperCase();

  const hash = computeCRC(data);
  return hash === checksum;
};

let custom = false

const read = (text: string, tagId?: string, subData=false): ParsedQR | NestedData => {
  const id = text.substring(0, 2);
  const len = parseInt(text.substring(2, 4), 10);

  const data = text.substring(4, len + 4);
  const next = text.substring(len + 4);

  if (!data.length || len !== data.length) {
    return {};
  }

  if (tagId === '62' && id === '00') {
    custom = true;
  } else if (tagId !== '62' && !subData) {
    custom = false;
  }

  let tag
  let subtag
  if (custom) {
    tag = getCustomTag(id);
    if (!tagId && !tag) return {};

    subtag = getCustomSubtag(tagId!, id);

  } else {
    tag = getTag(id);
    if (!tagId && !tag) return {};

    subtag = getSubTag(tagId!, id);
  }

  if (tagId && !subtag) {
    return {};
  }

  const subdata = read(data, id, true);

  const value = {
    id,
    name: subtag ? subtag.name : tag!.name,
    len,
    data: Object.keys(subdata).length ? subdata : data,
  };

  if (next.length) {
    return {
      [id]: value,
      ...read(next, tagId),
    };
  } else {
    return {
      [id]: value,
    };
  }
};

export const decodeQrData = (text: string): ParsedQR => {
  if (!validate(text)) {
    throw new Error('Checksum validation failed.');
  }

  return read(text) as ParsedQR;
};