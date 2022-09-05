import express from 'express';
import {
  getAllStatuses,
  getStatus,
  validateGetStatus,
} from '@services/statuses.service';

const statusesRouter = express.Router();

statusesRouter.get('/', getAllStatuses);
statusesRouter.get('/:statusId', ...validateGetStatus(), getStatus);

export default statusesRouter;
