import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { errorHandlerMiddleware, errorHandler } from './common/error';
import { stream } from './common/winston';
import apiRouter from './api/index';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// HTTP request logger middleware for node.js
// app.use(morgan('combined', { stream: winston.stream }));
app.use(morgan('combined', { stream }));

/**
 * Parse incoming request bodies in a middleware before your handlers,
 * available under the req.body property.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Parse Cookie header and populate req.cookies
app.use(cookieParser());

/**
 * CORS is a node.js package for providing a Connect/Express middleware
 * that can be used to enable CORS with various options.
 */
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

/**
 * apply to all requests
 * Note - Rate Limiter can be applied to any individual API also. For more information
 * Please visit https://www.npmjs.com/package/express-rate-limit
 */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// API Calling
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

process.on('uncaughtException', function (err) {
  errorHandler(err);
});

// error handler
app.use(function (err, req, res, next) {
  errorHandlerMiddleware(err, req, res);
});

export default app;
