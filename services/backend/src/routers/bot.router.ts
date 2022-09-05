import express from 'express';
import { pickMovie } from '@services/bot.service';

const botRouter = express.Router();

botRouter.get('/movies/random', pickMovie);

export default botRouter;
