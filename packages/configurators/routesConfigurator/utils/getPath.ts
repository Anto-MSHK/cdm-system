import { OperationItemType, OperationType } from "../_types";

export function getPath(
  routeName: string,
  operation: Omit<OperationItemType, "id" | "path" | "handler">
) {
  const operPathParam = operation.fields.find((f) => f.input === "path");
  return `/${routeName}${
    operation.endpoint !== "" ? "/" + operation.endpoint : ""
  }${operPathParam ? "/:" + operPathParam.name : ""}`;
}
