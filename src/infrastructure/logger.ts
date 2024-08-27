import { createLogger, transports, format } from "winston";
import { envs } from '../core/config/env'
import { LogLevels } from "../core/constants";

const logger = createLogger({
  level: envs.LOG_LEVEL,
  format: format.combine(format.timestamp(), format.json()),
  transports: [//new transports.Console(),
    new transports.File({
        filename: envs.LOG_FILE_ALL,
      }),
      new transports.File({
        filename: envs.LOG_FILE_ERROR,
        level: LogLevels.ERROR,
      }),
  ],
});

export { logger };