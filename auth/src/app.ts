import express, { json } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from './routes/index';
import { errorHandler, NotFoundError } from '@jfftickets/common';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUserRouter, signinRouter, signoutRouter, signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
