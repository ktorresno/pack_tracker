import { NextFunction, Request, Response } from 'express';
import { HttpCode, NodeEnv, ErrMessagesDefaults } from '../../core/constants';
import { envs } from '../../core/config/env';
import { AppErrOptions, AppError, customErrOptions } from './AppError';
import { ensureError } from '../common/utilErrors';

function productionError (err: AppError, res: Response) {
    // Operational error: send message to client about the error
    if (err.isOperational) {
        res.status(err.statusCode).json({
            message: err.message
        });
    } else {
        // Sends a generic message to the client about the error.
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            status: ErrMessagesDefaults.ERR_STR,
            message: ErrMessagesDefaults.INTERNAL_SERVER_ERROR
        });
    }
};

const developmentError = (err: AppError, res: Response) => {
    const responseObj: customErrOptions = {
        message: err.message,
        cause: err,
        stack: err.stack
    }
    console.log('developmentError: ', responseObj);
    res.status(err.statusCode).json(responseObj);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: AppError, req: Request, res: Response, _: NextFunction) {
    const statusCode: number = getStatusCode(err.statusCode, HttpCode.INTERNAL_SERVER_ERROR) as number;
    const errOptions: AppErrOptions = {
        cause: ensureError(err),
        context: { ...req.body }
    };

    const appError = new AppError(
        "An error occurred: ",
        statusCode,
        errOptions
    );
    checkErrorByEnv(appError, res);
}

function getStatusCode(
    currentValue: string | number | undefined,
    defaultValue: string | number
): string | number {
    return currentValue || defaultValue;
}

function checkErrorByEnv(err: AppError, res: Response) {
    if (envs.NODE_ENV === NodeEnv.ENV_PROD) {
        productionError(err, res);
    } else {
        developmentError(err, res);
    }
}