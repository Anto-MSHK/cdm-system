import { ATTRIBUTES_KEY } from "./constants";
import { FieldConfig } from "./models/field";

export function annotateField(
  target: Object,
  propertyName: string,
  options: FieldConfig = {}
) {
  addAttribute(target, propertyName, options);
}

function setAttributes(target: any, attributes: any) {
  Reflect.defineMetadata(ATTRIBUTES_KEY, attributes, target);
}

function getAttributes(target: Object) {
  const attributes = Reflect.getMetadata(ATTRIBUTES_KEY, target) as any;
  if (attributes) {
    return Object.keys(attributes).reduce((copy: any, key) => {
      copy[key] = { ...attributes[key] };
      return copy;
    }, {});
  }
}
function addAttribute(target: Object, name: string, options: FieldConfig) {
  let attributes = getAttributes(target);
  if (!attributes) {
    attributes = {};
  }
  attributes[name] = { ...attributes[name], ...options };
  setAttributes(target, attributes);
}
