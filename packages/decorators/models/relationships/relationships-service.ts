import { Model } from "@models/Model";
import { HAS_MANY_KEY, HAS_ONE_KEY } from "../../_constants";
import { HasOneConfig } from "../_types";
import { Scope } from "src/Scope";

export function annotateHasMany(
  target: Object,
  propertyName: string,
  options: HasOneConfig
) {
  addRelationshipAttributes(target, options.model, HAS_MANY_KEY, {
    ...options,
    linkFieldName: propertyName,
  });
}

export function annotateHasOne(
  target: Object,
  propertyName: string,
  options: HasOneConfig
) {
  addRelationshipAttributes(target, options.model, HAS_ONE_KEY, {
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
