import { ModelConfig } from "./models/contact";

export function annotateModel(
  target: Function,
  modelType: string,
  options: ModelConfig = {}
) {
  setModelName(target.prototype, modelType, options);
}

function setModelName(
  target: Function,
  modelType: string,
  options: ModelConfig
) {
  Reflect.defineMetadata(
    modelType,
    options.modelName || target.constructor.name,
    target
  );
}
