import express from 'express';
import { getCurrentUser } from '@services/users.service';

const usersRouter = express.Router();

usersRouter.get('/@me', getCurrentUser);

export default usersRouter;
