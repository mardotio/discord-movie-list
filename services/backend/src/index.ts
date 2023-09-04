import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import APP_ENVIRONMENT from '@util/environment';
import tokenRouter from '@routers/token.router';
import withJwtAuth, { withBotJwtAuth } from 'middleware/auth';
import userRouter from '@routers/user.router';

const PORT = parseInt(APP_ENVIRONMENT.SERVER_PORT, 10);
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/token', withBotJwtAuth, tokenRouter);
app.use('/users', withJwtAuth, userRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
