import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import healthcheckRouteRoute from './routes/healthcheck.route';
import paymentsRoute from './routes/payments.route';

import config from './config';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import logger from './util/logger';

// Create Express server
const app = express();
app.set('config', config);


// Express configuration
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRouteRoute);
app.use('/api', paymentsRoute);


class ResponseError extends Error {
    status?: number;
}

app.use((req: Request, res: Response, next: NextFunction) => {
    let err = new ResponseError('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const error = !err.message ? new ResponseError(err) : err;

    logger.error('app error: ', err, res);

    if (!error.status) {
        error.message = 'Internal Server Error';
        error.status = 500;
    }
    next(error);
    // res.status(error.status).send(error.message);
});

export default app;
