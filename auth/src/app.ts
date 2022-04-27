import express, { json } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { currentUserRouter, signinRouter, signoutRouter, signupRouter } from './routes/index';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter, signinRouter, signoutRouter, signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
