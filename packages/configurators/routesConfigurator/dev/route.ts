import { RouteType } from "@configurators/routesConfigurator/_types";
import { GET_ALL, GET_ONE } from "@decorators/routes/_constants";
import { DEV_ROUTE_NAME, GET_ALL_METHOD } from "../_constants";
import { typeValidator } from "../utils/typeValidator";
import { FieldType } from "@decorators/models/_types";
import { v4 as uuidv4 } from "uuid";
import { getModelByName } from "packages/handlers/dev/getModelByName";
import { getModels } from "packages/handlers/dev/getModels";

export const dev_route: RouteType = {
  routeName: DEV_ROUTE_NAME,
  operations: {
    [GET_ALL().method as string]: {
      id: uuidv4(),
      fields: [],
      endpoint: "models",
      handler: getModels,
    },
    [GET_ONE().method as string]: {
      id: uuidv4(),
      fields: [
        {
          input: "path",
          name: "name",
          validator: typeValidator("path", "name", {
            type: FieldType.STRING,
            required: true,
          }),
          required: true,
          type: FieldType.STRING,
        },
      ],
      endpoint: "models",
      handler: getModelByName,
    },
  },
};
