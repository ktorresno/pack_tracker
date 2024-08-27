import 'dotenv/config';
import { get } from 'env-var';
import { API_PREFIX_DEFAULT, LogLevels, NodeEnv } from "../constants";

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    API_PREFIX: get('DEFAULT_API_PREFIX').default(API_PREFIX_DEFAULT).asString(),
    NODE_ENV: get('NODE_ENV').default(NodeEnv.ENV_DEV).asString(),
    LOG_LEVEL: get('LOG_LEVEL').default(LogLevels.INFO).asString(),
    LOG_FILE_ALL: get('LOG_FILE_ALL').asString(),
    LOG_FILE_ERROR: get('LOG_FILE_ERROR').asString(),
}