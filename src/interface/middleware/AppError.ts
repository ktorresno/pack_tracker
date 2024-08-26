type JsonOjb = string | number | boolean | null | undefined |
                readonly JsonOjb[] |
                { readonly [key: string]: JsonOjb } |
                 { toJSON(): JsonOjb }
export interface AppErrOptions {
    cause?: Error;
    context?: JsonOjb;
}

export interface customErrOptions {
    message: string,
    cause?: Error,
    stack: string | undefined
}

export class AppError extends Error {
    public readonly context?: JsonOjb;
    public readonly isOperational: boolean;
    public readonly statusCode: number;

    constructor(
        message: string,
        statusCode: number,
        options: AppErrOptions = {}
    ) {
        const { cause, context } = options;

        super(message, { cause });
        this.name = this.constructor.name

        this.context = context;
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }

}
