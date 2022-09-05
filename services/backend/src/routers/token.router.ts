import express from 'express';
import createToken from '@services/token.service';

const tokenRouter = express.Router();

tokenRouter.post('/', createToken);

export default tokenRouter;
