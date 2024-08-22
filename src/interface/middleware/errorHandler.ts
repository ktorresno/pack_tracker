/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { HttpCode, NodeEnv, ErrMessagesDefaults } from '../../core/constants';
import { envs } from '../../core/config/env';
import { AppError } from './AppError';

function productionError (err: AppError, res: Response) {
    // Operational error: send message to client about the error
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
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
    const responseObj = {
        status: err.status,
        message: err.message,
        //error: err,
        stack: err.stack
    }
    console.log('developmentError: ', responseObj);
    console.log('err.isOperational: ', err.isOperational);
    res.status(err.statusCode).json(responseObj);
}

function getInfoItem(
    infoItem: string | number,
    defaultValue: string | number
): string | number {
    return infoItem || defaultValue;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
    console.error(err.stack);

    err.statusCode = getInfoItem(err.statusCode, HttpCode.INTERNAL_SERVER_ERROR);
    err.status = getInfoItem(err.status, ErrMessagesDefaults.ERR_STR) ;

    const error = { ...err };
    console.log("------- begin -------");
    console.log("Error: ", error);
    console.log("------- end -------");
    checkErrorByEnv(error, res);
}

function checkErrorByEnv(err: AppError, res: Response) {
    if (envs.NODE_ENV === NodeEnv.ENV_PROD) {
        productionError(err, res);
    } else {
        developmentError(err, res);
    }
}