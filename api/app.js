import express from 'express';
import helmet from 'helmet';
import { json } from 'body-parser';
import { serve, setup } from 'swagger-ui-express';
import cors from 'cors';
import swaggerDocument from '../Doc/swagger.json';
import responseFormatter from './utils/responseFormatter';

// Set log level (application-wide)
const app = express();
app.use(cors());
app.use('/api-docs', serve, setup(swaggerDocument));
// Protect application from some well-known vulnerabilities
app.use(helmet());
// Parse request body as JSON
app.use(json());
// Configure app routes
const BASE_PATH = process.env.BASE_PATH || '/';
app.use(BASE_PATH, require('./routes').default);
// Catch 404 and forward to error handler
app.use((req, res, next) => {
  if (res.headersSent) next();
  const err = new Error('Not Found');
  err.status_code = 404;
  err.status_message = 'Not Found';
  return next(err);
});
// Error handler
app.use((err, req, res, next) => {
  if (res.headersSent) next(err);
  const status = err.status_code || 500;
  res.status(status);
  res.json(
    responseFormatter.formatter({
      status,
      data: {
        details: err.details,
        message: err.status_message
      }
    })
  );
  return null;
});

export default app;
