import { MODEL_CONFIG_KEY } from "../_constants";
import { ModelConfig } from "../_types";
import { annotateModel } from "./modelConfig-service";

export function ModelConfig(metadata?: ModelConfig) {
  return function (target: Function) {
    annotateModel(target, MODEL_CONFIG_KEY, metadata);
  };
}
