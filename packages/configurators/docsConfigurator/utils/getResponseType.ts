import translate from "packages/i18next";
import { SwaggerDocsConfig, SwaggerMethod } from "../_types";

const schemaWith = {
  delete: {
    type: "string",
  },
};

export function getResponseType(
  method: string,
  tag: string
): SwaggerMethod["responses"] {
  let schema = undefined;
  const curModel = tag[0].toUpperCase() + tag.slice(1);
  if ((schemaWith as any)[method]) schema = (schemaWith as any)[method];
  else
    schema = {
      $ref: "#/definitions/" + curModel,
    };
  return {
    "200": {
      description: translate("res-200"),
      schema,
    },
  };
}
