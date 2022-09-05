/**
 * Required External Modules
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import APP_ENVIRONMENT from '@util/environment';
import moviesRouter from '@routers/movies.router';
import tokenRouter from '@routers/token.router';
import statusesRouter from '@routers/statuses.router';
import usersRouter from '@routers/users.router';
import botRouter from '@routers/bot.router';
import config from './database';
import withJwtAuth, { withBotAuth, withBotJwtAuth } from './middleware/auth';

/**
 * App Variables
 */

const PORT = parseInt(APP_ENVIRONMENT.SERVER_PORT, 10);
const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/token', withBotJwtAuth, tokenRouter);
app.use('/users', withJwtAuth, usersRouter);
app.use('/movies', withJwtAuth, moviesRouter);
app.use('/statuses', withJwtAuth, statusesRouter);
app.use('/bot', withBotAuth, botRouter);

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

/**
 * Server Activation
 */
createConnection(config())
  .then(() => {
    const server = app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Listening on port ${PORT}`);
    });
    const activateHmr = () => {
      if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => server.close());
      }
    };
    activateHmr();
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to DB', e);
    process.exit(1);
  });
