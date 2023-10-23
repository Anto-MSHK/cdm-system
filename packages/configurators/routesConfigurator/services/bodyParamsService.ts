import { FieldInRoute } from "../_types";
import { typeValidator } from "../utils/typeValidator";
import { ModelParams } from "@models/Model";

export function bodyParamsService(
  modelParams: ModelParams,
  operation: FieldInRoute[],
  paramets: string[],
  method: "operation:update" | "operation:create"
) {
  for (const key in modelParams.fields) {
    let field = modelParams.fields[key];
    field = {
      ...field,
      required:
        method === "operation:update"
          ? false
          : !field.required
          ? true
          : field.required,
    };
    if (paramets.includes(key))
      operation.push({
        name: key,
        validator: typeValidator("body", key, field),
        input: "body",
        ...field,
      });
  }
}
