import { Model } from "@models/Model";
import { FOREIGN_KEY, MANY_AT_KEY, ONLY_ONE_AT_KEY } from "../../_constants";
import { HasOneConfig } from "../_types";
import { Scope } from "src/Scope";

export function annotateManyAt(
  target: Object,
  propertyName: string,
  options: HasOneConfig
) {
  addRelationshipAttributes(target, options.model, MANY_AT_KEY, {
    ...options,
    linkFieldName: propertyName,
  });
}

export function annotateOnlyOneAt(
  target: Object,
  propertyName: string,
  options: HasOneConfig
) {
  addRelationshipAttributes(target, options.model, ONLY_ONE_AT_KEY, {
    ...options,
    linkFieldName: propertyName,
  });
}

function getAttributes(target: Object, key: string) {
  const attributes = Reflect.getMetadata(key, target) as any;
  if (!attributes) return [];
  else return attributes;
}

function setRelationship(
  key: string,
  target: any,
  model: Scope,
  linkFieldName?: string
) {
  let attributes = getAttributes(target, key);
  Reflect.defineMetadata(
    key,
    [
      ...attributes,
      {
        model: Scope[model],
        relation: key,
        linkFieldName: linkFieldName,
      },
    ],
    target
  );
}

function addRelationshipAttributes(
  target: Object,
  relation: Scope,
  key: string,
  options: Omit<HasOneConfig, "model">
) {
  setRelationship(key, target, relation, options.linkFieldName);
}
