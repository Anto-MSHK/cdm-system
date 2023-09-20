export enum Entities {
  CONTACT = "contact",
  SUBJECT = "subject",
}

export interface EntityConfig {
  entity: Entities;
}

export interface ModelConfig {
  modelName?: string;
}

export interface ContactModelConfig extends ModelConfig {}

export enum FieldType {
  UUID = "uuid",
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
}

type FieldDefaultValueType = {
  [FieldType.UUID]: string;
  [FieldType.STRING]: string;
  [FieldType.NUMBER]: number;
  [FieldType.BOOLEAN]: boolean;
};

export interface FieldConfig {
  type: FieldType;
  required?: boolean;
  unique?: boolean;
  defaultValue?: FieldDefaultValueType[FieldType];
}
