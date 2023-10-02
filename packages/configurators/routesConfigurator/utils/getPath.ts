import { OperationItemType, OperationType } from "../_types";

export function getPath(routeName: string, operation: OperationItemType) {
  const operPathParam = operation.fields.find((f) => f.input === "path");
  return `/${routeName}${
    operation.endpoint !== "" ? "/" + operation.endpoint : ""
  }${operPathParam ? "/:" + operPathParam.name : ""}`;
}
