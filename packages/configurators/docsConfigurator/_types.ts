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
  name?: string;
  required?: boolean;
  in: "path" | "query" | "body";
  type: "string" | "number" | "boolean" | "object";
  description?: string;
  schema?: {
    $ref: string;
  };
};

type SwaggerMethod = {
  summary?: string;
  operationId?: string;
  description?: string;
  parameters?: SwaggerParam[];
  responses?: {
    "200": SwaggerResponse;
    "400"?: SwaggerResponse;
    "404"?: SwaggerResponse;
  };
  tags?: string[];
  $ref?: string;
};

type SwaggerPath = {
  // /todos/
  get?: SwaggerMethod;
  post?: SwaggerMethod;
  put?: SwaggerMethod;
  delete?: SwaggerMethod;
};

type SwaggerPropertiesDefinition = {
  type: SwaggerParam["type"];
  summary?: string;
  description?: string;
  example?: string;
  minimum?: number;
  maximum?: number;
  enum?: string[];
  $ref?: string;
};
type SwaggerDefinitions = {
  [key: string]: {
    // (model) Todo
    type: "object";
    description: string;
    properties: {
      [key: string]: SwaggerPropertiesDefinition;
    };
    required?: string[];
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
  SwaggerPropertiesDefinition,
  SwaggerDefinitions,
  SwaggerDocsConfig,
};
