import express, { type Request, type Response } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY, WILDCARD_ASTERISK } from './core/constants';
import { errorHandler } from './interface/middleware/errorHandler';
import { AppError } from './interface/middleware/AppError';

interface ServerOptions {
    port: number;
    apiPrefix: string;
}

export class Server {
    private readonly app = express();
    private port: number;
    private readonly apiPrefix: string;

    constructor(options: ServerOptions) {
        const { port, apiPrefix } = options;
        this.port = port;
        this.apiPrefix = apiPrefix
    }

    async start(): Promise<void> {
        const oneHourMilliseconds = SIXTY * SIXTY * ONE_THOUSAND;
        //* Middlewares
        this.app.use(express.json()); // parse json in request body (allow raw)
        this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded , limit: "15kb"
        this.app.use(compression());
        // limit repeated requests to public APIs
        this.app.use(
            rateLimit({
                max: ONE_HUNDRED,
                windowMs: oneHourMilliseconds,
                message: 'Too many requests from this IP, please try again in one hour'
            })
        );

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}...`);
        });

        // Test rest api
        this.app.get(this.apiPrefix, (_req: Request, res: Response)  => {
            return res.status(HttpCode.OK).send({
                message: `Welcome to Initial API! \n Endpoints available at http://localhost:${this.port}${this.apiPrefix}`
            });
        });

        this.app.all(WILDCARD_ASTERISK, (req, _, next) => {
            next(new AppError(`Path '${req.originalUrl}' does not exist for the ${req.method} method`, HttpCode.NOT_FOUND));
        });
        this.app.use(errorHandler);
    }
}