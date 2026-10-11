import { Request } from '@playwright/test';
import { createLogger, format, transports } from 'winston';

export const LoggerManager = {
  logger: createLogger({
    level: 'info',
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
      }),
    ),
    transports: [new transports.Console()],
  }),
};

export interface APIInterface {
  apiRequest: Request;
}
