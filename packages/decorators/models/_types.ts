import { Model } from "@models/Model";
import { ValidationChain } from "express-validator";
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
  DATE = "date",
  NUMBER = "number",
  BOOLEAN = "boolean",
}

type FieldDefaultValueType = {
  [FieldType.UUID]: string;
  [FieldType.STRING]: string;
  [FieldType.DATE]: typeof Date;
  [FieldType.NUMBER]: number;
  [FieldType.BOOLEAN]: boolean;
};

export interface FieldConfig {
  type: FieldType;
  enum?: string[];
  label?: string;
  required?: boolean;
  unique?: boolean;
  defaultValue?: FieldDefaultValueType[FieldType];
  regex?: RegexType;
  min?: number;
  max?: number;
}

export interface RelationshipConfig {
  model: Scope;
  linkFieldName?: string;
}

export type RegexType = {
  name: keyof ValidationChain | "custom";
  regex?: RegExp;
};

type RegexCustomType = (regex: RegExp) => RegexType;

export const R_EMAIL: RegexType = {
  name: "isEmail",
};

export const R_CUSTOM: RegexCustomType = (regex) => ({
  name: "custom",
  regex,
});
