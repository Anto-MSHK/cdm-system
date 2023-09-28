type SwaggerInfo = {
  title: string;
  description: string;
  version: string;
};

type SwaggerResponse = {
  description: string;
  schema: {
    $ref: string; // "#/definitions/Todos"
  };
};

type SwaggerParam = {
  name: string;
  required?: boolean;
  in: "path" | "query" | "body";
  type: "string" | "number" | "boolean" | "uuid";
  description?: string;
};

type SwaggerMethod = {
  description?: string;
  parameters?: SwaggerParam[];
  responses?: {
    "200": SwaggerResponse;
    "400": SwaggerResponse;
    "404": SwaggerResponse;
  };
  tags?: string[];
};

type SwaggerPath = {
  // /todos/
  get?: SwaggerMethod;
  post?: SwaggerMethod;
  put?: SwaggerMethod;
  delete?: SwaggerMethod;
};

type SwaggerDefinitions = {
  [key: string]: {
    // (model) Todo
    type: "object";
    properties: {
      [key: string]: {
        type: "string" | "number" | "boolean";
        example: string;
      };
    };
  };
};
type SwaggerDocsConfig = {
  swagger: "2.0";
  info: SwaggerInfo;
  host: string;
  basePath: string; // "/"
  schemes?: ("http" | "https")[];
  paths: { [key: string]: SwaggerPath };
  definitions?: SwaggerDefinitions;
};

export interface UserDocsConfig {
  info: SwaggerInfo;
  host: string;
  basePath: string;
}

export {
  SwaggerInfo,
  SwaggerResponse,
  SwaggerParam,
  SwaggerMethod,
  SwaggerPath,
  SwaggerDefinitions,
  SwaggerDocsConfig,
};
