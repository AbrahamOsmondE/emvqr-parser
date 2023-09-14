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

  let tag
  if (custom) {
    tag = getCustomTag(id);
  } else {
    tag = getTag(id);
  }

  if (!tagId && !tag) return {};

  const subdata = isSubDataId(id) ? readSubData(data, id) : {};

  const value = {
    id,
    name: tag!.name,
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

const readSubData = (text: string, tagId: string, custom?:boolean): ParsedQR | NestedData => {
  if (text.length < 3) {
    return {};
  }

  const id = text.substring(0, 2);
  const len = parseInt(text.substring(2, 4), 10);

  if (!len) {
    return {};
  }

  const data = text.substring(4, len + 4);
  const next = text.substring(len + 4);

  if (!data.length || len !== data.length) {
    return {};
  }

  let cust
  if (tagId === '62' && id === '00') {
    cust = true;
  } else if (tagId !== '62') {
    cust = false;
  }

  cust = custom ?? cust

  let subtag
  if (cust) {
    subtag = getCustomSubtag(tagId, id);
  } else {
    subtag = getSubTag(tagId, id);
  }
  
  if (!subtag) return {};

  const value = {
    id,
    name: subtag!.name,
    len,
    data: data,
  };

  if (next.length) {
    return {
      [id]: value,
      ...readSubData(next, tagId, cust),
    };
  } else {
    return {
      [id]: value,
    };
  }
};

const isSubDataId = (id: string) => {
  const intId = parseInt(id, 10);
  return (intId >= 2 && intId <= 51) || intId === 62 || intId === 64 || (intId >= 65 && intId <= 99);
};

export const decodeQrData = (text: string): ParsedQR => {
  if (!validate(text)) {
    throw new Error('Checksum validation failed.');
  }

  return read(text) as ParsedQR;
};