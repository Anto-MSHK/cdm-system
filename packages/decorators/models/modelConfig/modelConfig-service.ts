import { ModelConfig } from "../_types";

export function annotateModel(
  target: Function,
  modelType: string,
  options: ModelConfig | undefined
) {
  setModelName(target.prototype, modelType, options);
}

function setModelName(
  target: Function,
  modelType: string,
  options: ModelConfig | undefined
) {
  Reflect.defineMetadata(
    modelType,
    { modelName: target.constructor.name, ...options },
    target
  );
}
