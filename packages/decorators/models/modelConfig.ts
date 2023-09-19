import { ContactModelConfig } from "@decorators/_types";
import { MODEL_CONFIG_KEY } from "../_constants";
import { annotateModel } from "./model-service";

export function ModelConfig(metadata?: ContactModelConfig) {
  return function (target: Function) {
    annotateModel(target, MODEL_CONFIG_KEY, metadata);
  };
}
