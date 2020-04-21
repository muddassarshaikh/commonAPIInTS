import winston from './winston';
import functions from './functions';

export function errorHandlerMiddleware(error, req, res) {
  winston.error(
    `${error.statusCode || 500} - ${error.message} - ${error.data} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );

  res.send(
    functions.responseGenerator(error.statusCode, error.message, error.data)
  );
}

export function errorHandler(error) {
  winston.error(`${JSON.stringify(error)}`);
}
