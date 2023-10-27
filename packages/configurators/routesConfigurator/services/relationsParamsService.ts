import { ModelCtor } from "sequelize-typescript";
import { FieldInRoute } from "../_types";
import { typeValidator } from "../utils/typeValidator";
import { usefulFieldsFromSequelize } from "@configurators/databaseConfigurator/utils/usefulFieldsFromSequelize";
import { FieldType } from "@decorators/models/_types";

export function relationsParamsService(
  dbModel: ModelCtor,
  operation: FieldInRoute[],
  method: "operation:update" | "operation:create"
) {
  const fields = usefulFieldsFromSequelize(
    Object.values((dbModel as any).tableAttributes)
  );
  fields.forEach((f) => {
    if (f.references)
      operation.push({
        name: f.fieldName,
        validator: typeValidator("body", f.fieldName, {
          type: FieldType["UUID"],
        }),
        type: FieldType["UUID"],
        input: "body",
        required: !f.allowNull,
      });
  });
}
