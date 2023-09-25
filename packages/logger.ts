import Logger from "pino";

export const logger = Logger({
  transport: {
    target: "pino-pretty",
  },
  options: {
    colorize: true,
  },
});
