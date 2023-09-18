import { CONTACT_MODEL_NAME_KEY } from "../constants";
import { annotateModel } from "../model-service";

export interface ModelConfig {
  modelName?: string;
}

export function ContactModel(metadata?: ModelConfig) {
  return function (target: Function) {
    annotateModel(target, CONTACT_MODEL_NAME_KEY, metadata);
  };
}
