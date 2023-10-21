import { swaggerFieldTypes } from "@configurators/docsConfigurator/_constants";
import { SwaggerPropertiesDefinition } from "@configurators/docsConfigurator/_types";
import { FieldInRoute } from "@configurators/routesConfigurator/_types";
import { FieldType } from "@decorators/models/_types";
import translate from "packages/i18n/i18next";
import { EditTableParams } from "./usefulFieldsFromSequelize";

export function getDocsFields(
  field: FieldInRoute | EditTableParams
): SwaggerPropertiesDefinition {
  let curRegex = undefined;
  if (field.regex) {
    curRegex = `REGEX - ${field.regex.name}${
      field.regex.regex ? ": " + field.regex.regex : ""
    }`;
  }
  return {
    type: swaggerFieldTypes[(field.type as FieldType).toLocaleLowerCase()],
    description:
      translate("type-ref") + (field.type as FieldType).toLocaleLowerCase(),
    summary: curRegex,
    minimum: field.min,
    maximum: field.max,
    enum: field.enum,
  };
}
