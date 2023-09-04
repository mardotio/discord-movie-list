import { getCurrentUser } from '@services/user.service';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/@me', getCurrentUser);

export default userRouter;
