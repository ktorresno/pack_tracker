import { logger } from "../../infrastructure/logger";
import { AppError } from "../middleware/AppError";

export interface customErrorArgs {
    message: string,
    cause?: Error,
    stack: string | undefined
}
export function ensureError(value: unknown): Error {
    return (value instanceof Error) ? value
        : getValidError(value);
}

function getValidError(value: unknown): Error{
    let stringified = '[Unable to stringify the thrown value]';
    try {
        stringified = JSON.stringify(value);
    } catch(error) {
        logger.error(`Class: AppError | Method: ensureError | Stringified error received: ${stringified} | error: ${error}`);
    }
    return new Error(`This value was thrown as is, not through an Error: ${stringified}`);
}

export function errorResult(err: AppError): customErrorArgs {
    return {
       message: err.message,
       cause: err,
       stack: err.stack
   }
}