import { getPath } from "@configurators/routesConfigurator/utils/getPath";
import { HandlerType } from "./_types";
import { ErrorType } from "@configurators/routesConfigurator/_types";

/**
 * Обработчик по умолчанию
 */
export const defaultHandler: HandlerType = (context) => async (req, res) => {
  return res.send({
    message: `${getPath(
      context.curRoute.routeName,
      context.curRoute.operation
    )} - default handler (endpoint in development)`,
    inDevelopment: true,
  } as ErrorType);
};
