import { RouteType } from "@configurators/routesConfigurator/_types";
import { GET_ALL, GET_ONE } from "@decorators/routes/_constants";
import { GET_ALL_METHOD, defaultHandler } from "../_constants";
import { typeValidator } from "../utils/typeValidator";
import { FieldType } from "@decorators/models/_types";
import { contextFor } from "../utils/contextFor";
import { getModels } from "./handlers";
import { v4 as uuidv4 } from "uuid";
export const dev_route: RouteType = {
  routeName: "dev",
  operations: {
    [GET_ALL().method as string]: {
      fields: [],
      endpoint: "models",
      handler: getModels,
      id: uuidv4(),
    },
    [GET_ONE().method as string]: {
      fields: [
        {
          input: "path",
          name: "name",
          validator: typeValidator("path", "name", FieldType.STRING, true),
          required: true,
          type: FieldType.STRING,
        },
      ],
      endpoint: "models",
      handler: defaultHandler,
      id: uuidv4(),
    },
  },
};
