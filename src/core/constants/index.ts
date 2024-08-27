export const SIXTY = 60;
export const ONE_HUNDRED = 100;
export const ONE_THOUSAND = 1000;
export const WILDCARD_ASTERISK = '*';
export const API_PREFIX_DEFAULT = '/api/v1';

export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
};

export enum ErrMessagesDefaults {
    ERR_STR = "error",
    INTERNAL_SERVER_ERROR = "Internal Server Error"
};

export enum NodeEnv {
    ENV_DEV = "development",
    ENV_TEST = "testing",
    ENV_PROD = "production"
};

export enum LogLevels {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    HTTP = 'http',
    VERBOSE = 'verbose',
    DEBUG = 'debug',
    SILLY = 'silly'
};