export interface ParsedQR {
  [key: string]: DataObject;
}

export interface NestedData {
  [key: string]: DataObject;
}

export interface Schema {
  [key: string]: {
    name: string;
    schema?: Schema;
  };
}

interface DataObject {
  id: string;
  name: string;
  len: number;
  data: string | NestedData;
}