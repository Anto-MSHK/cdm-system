import { Model } from "@models/Model";
import { Scope } from "src/Scope";

export enum Entities {
  CONTACT = "contact",
  SUBJECT = "subject",
}

export interface EntityConfig {
  entity: Entities;
}

export interface ModelConfig {
  modelName?: string;
  modelLabel?: string;
}

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
  label?: string;
  required?: boolean;
  unique?: boolean;
  defaultValue?: FieldDefaultValueType[FieldType];
}

export interface RelationshipConfig {
  model: Scope;
  linkFieldName?: string;
}
