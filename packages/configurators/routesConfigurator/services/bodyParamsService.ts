import { FieldInRoute } from "../_types";
import { typeValidator } from "../utils/typeValidator";
import { ModelParams } from "@models/Model";

export function bodyParamsService(
  modelParams: ModelParams,
  operation: FieldInRoute[],
  paramets: string[]
) {
  for (const key in modelParams.fields) {
    const field = modelParams.fields[key];
    if (paramets.includes(key))
      operation.push({
        name: key,
        validator: typeValidator("body", key, field.type, field.required),
        input: "body",
        ...field,
      });
  }
}
