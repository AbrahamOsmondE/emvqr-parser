import {schema, schemaForCustomPayment} from './utils/constants'

export const getTag = (tagId: string) => {
  const tag = schema[tagId];

  if (!tag) {
    const id = parseInt(tagId, 10);

    switch (true) {
      case id >= 2 && id <= 51:
        return schema['02-51'];
      case id >= 52 && id <= 64:
        return schema['52-64'];
      case id >= 65 && id <= 79:
        return schema['65-79'];
      case id >= 80 && id <= 99:
        return schema['80-99'];

      default:
        return;
    }
  }

  return tag;
};

export const getSubTag = (tagId: string, subTagid: string) => {
  if (!tagId) return;

  const tag = getTag(tagId);

  if (!tag || !tag.schema) {
    return;
  }

  const subTag = tag.schema[subTagid];

  if (!subTag) {
    const id = parseInt(subTagid, 10);

    switch (true) {
      case tagId === '62' && id >= 10 && id <= 49:
        return tag.schema['10-49'];
      case tagId === '62' && id >= 50 && id <= 99:
        return tag.schema['50-99'];
      case id >= 1 && id <= 63:
        return tag.schema['01-63'];
      case id >= 2 && id <= 51:
        return tag.schema['02-51'];
      case id >= 65 && id <= 79:
        return tag.schema['65-79'];
      case id >= 80 && id <= 99:
        return tag.schema['80-99'];
      default:
        return;
    }
  }

  return subTag;
};

export const getCustomSubtag = (tagId: string, subTagid: string) => {
  if (!tagId) return;

  const tag = getCustomTag(tagId);

  if (!tag || !tag.schema) {
    return;
  }
  const subTag = tag.schema[subTagid];

  if (!subTag) {
    const id = parseInt(subTagid, 10);

    switch (true) {
      case tagId === '62' && id >= 1 && id <= 99:
        return tag.schema['01-99'];
      case id >= 1 && id <= 63:
        return tag.schema['01-63'];
      case id >= 2 && id <= 51:
        return tag.schema['02-51'];
      case id >= 65 && id <= 79:
        return tag.schema['65-79'];
      case id >= 80 && id <= 99:
        return tag.schema['80-99'];
      default:
        return;
    }
  }

  return subTag;
};

export const getCustomTag = (tagId: string) => {
  const tag = schemaForCustomPayment[tagId];

  if (!tag) {
    const id = parseInt(tagId, 10);

    switch (true) {
      case id >= 2 && id <= 51:
        return schemaForCustomPayment['02-51'];
      case id >= 65 && id <= 79:
        return schemaForCustomPayment['65-79'];
      case id >= 80 && id <= 99:
        return schemaForCustomPayment['80-99'];

      default:
        return;
    }
  }

  return tag;
};